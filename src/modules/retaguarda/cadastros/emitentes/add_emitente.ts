import { cnpj } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { aspasSimplesDB } from "../../../../utils/ultils";
import ie from "inscricaoestadual";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_emitente', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
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

        await pgSql(`insert into tb_empresa (
            crt,
            razao_social,
            nome_fantasia,
            cnpj,
            ie,
            im,
            cnae,
            fone,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            cep,
            ativo,
            email,
            municipio,
            uf,
            ultimo_numero_nfe,
            caixa
        ) values (
            ${req.body.regime},
            '${aspasSimplesDB(req.body.nome)}',
            '${aspasSimplesDB(req.body.fantasia)}',
            '${req.body.cnpj}',
            '${req.body.ie}',
            '${req.body.im}',
            '${req.body.cnae}',
            '${req.body.tel}',
            '${req.body.endereco}',
            '${req.body.numero}',
            '${req.body.complemento}',
            '${req.body.bairro}',
            '${req.body.codibge}',
            ${req.body.cep},
            ${req.body.ativo ? 1 : 0},
            '${aspasSimplesDB(req.body.email)}',
            '${rCidade[0].descricao}',
            '${req.body.uf}',
            ${req.body.ultima_nfe},
            ${req.body.caixa}
        )`)

        res.json({
            ok: true,
        })
    }
}