import { cnpj } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import ie from "inscricaoestadual";
import { aspasSimplesDB } from "../../../../utils/ultils";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_emitente', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        if (!req.body.id) {
            res.json({
                ok: false,
                msg: 'Emitente não foi identificado'
            })
            return;
        }

        if (!cnpj.isValid(req.body.cnpj)) {
            res.json({
                ok: false,
                msg: 'CNPJ inválido'
            })
            return
        }

        if (!req.body.ie || !ie(req.body.ie, req.body.uf)) {
            res.json({
                ok: false,
                msg: `Inscrição estadual inválida para ${req.body.uf}`
            })
            return
        }

        const options: ClientConfig = {
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: `d${req.body.idLoja}`,
            port: 5432
        }

        const pgSql = pgConnection(options)

        const rCidade = await pgSql(`select descricao from tb_cidade where cod_ibge = ${req.body.codibge}`)

        if (!rCidade[0]) {
            res.json({
                ok: false,
                msg: 'Informe um código IBGE válido'
            })
            return
        }

        await pgSql(`update tb_empresa set
            crt = ${req.body.regime},
            razao_social = '${aspasSimplesDB(req.body.nome)}',
            nome_fantasia = '${aspasSimplesDB(req.body.fantasia)}',
            cnpj = '${req.body.cnpj}',
            ie = '${req.body.ie}',
            im = '${req.body.im}',
            cnae = '${req.body.cnae}',
            fone = '${req.body.tel}',
            endereco = '${req.body.endereco}',
            numero = '${req.body.numero}',
            complemento = '${req.body.complemento}',
            bairro = '${req.body.bairro}',
            cidade = '${req.body.codibge}',
            cep = ${req.body.cep},
            ativo = ${req.body.ativo ? 1 : 0},
            email = '${aspasSimplesDB(req.body.email)}',
            municipio = '${rCidade[0].descricao}',
            uf = '${req.body.uf}',
            ultimo_numero_nfe = ${req.body.ultima_nfe},
            caixa = ${req.body.caixa}
            where id_empresa = ${req.body.id}
        `)

        res.json({
            ok: true
        })
    }
}