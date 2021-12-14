import { cnpj, cpf } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { aspasSimplesDB } from "../../../../utils/ultils";
import { rg } from 'cpf-rg-validator'
import ie from "inscricaoestadual";

const docInvalido = (doc) => {
    if (`${doc}`.length === 11) {
        if (cpf.isValid(doc)) return null;
        else return 'CPF inválido';
    }

    if (`${doc}`.length === 14) {
        if (cnpj.isValid(doc)) return null;
        else return 'CNPJ inválido';
    }

    return 'CPF ou CNPJ inválido'
}

export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_cliente', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        const docInv = !req.body.cpf_cnpj ? null : docInvalido(req.body.cpf_cnpj);

        if (!!docInv) {
            res.json({
                ok: false,
                msg: docInv
            })
            return;
        }

        if (req.body.tipopessoa === 0 && !!req.body.rg_ie) {
            const ieValid = ie(req.body.rg_ie, req.body.uf)
            if (!ieValid) {
                res.json({
                    ok: false,
                    msg: `Inscrição estadual inválida para ${req.body.uf}`
                })

                return;
            }
        }

        if (req.body.tipopessoa === 1 && !!req.body.rg_ie) {
            const rgValid = rg(req.body.rg_ie)

            if (!rgValid) {
                res.json({
                    ok: false,
                    msg: `RG inválido`
                })

                return;
            }
        }

        const options: ClientConfig = {
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: `d${req.body.idLoja}`,
            port: 5432
        }

        const pgSql = pgConnection(options)

        await pgSql(`update tb_cliente set 
            tipopessoa = ${req.body.tipopessoa || 'tipopessoa'},
            cpf_cnpj = ${`'${req.body.cpf_cnpj}'` || 'cpf_cnpj'},
            rg_ie = ${`'${req.body.rg_ie}'` || 'rg_ie'},
            nome = ${`'${aspasSimplesDB(req.body.nome)}'` || 'nome'},
            fantasia = ${`'${aspasSimplesDB(req.body.fantasia)}'` || 'fantasia'},
            cep = ${`'${req.body.cep}'` || 'cep'},
            endereco = ${`'${aspasSimplesDB(req.body.endereco)}'` || 'endereco'},
            numero = ${`${req.body.numero}` || 'numero'},
            complemento = ${`'${aspasSimplesDB(req.body.complemento)}'` || 'complemento'},
            bairro = ${`'${aspasSimplesDB(req.body.bairro)}'` || 'bairro'},
            cidade = ${`'${aspasSimplesDB(req.body.cidade)}'` || 'cidade'},
            codibge = ${`${req.body.codibge}` || 'codibge'},
            uf = ${`'${req.body.uf}'` || 'uf'},
            fone = ${`'${req.body.fone}'` || 'fone'},
            cel = ${`'${req.body.cel}'` || 'cel'},
            cliente_func = ${`'C'` || 'cliente_func'},
            limite_cliente = ${`${req.body.limite_cliente}` || 'limite_cliente'},
            ativo = ${`${!!req.body.ativo ? 1 : 0}` || 'ativo'},
            email = ${`'${aspasSimplesDB(req.body.email)}'` || 'email'},
            email2 = ${`'${aspasSimplesDB(req.body.email2)}'` || 'email2'},
            referencia = ${`'${aspasSimplesDB(req.body.referencia)}'` || 'referencia'},
            contribuinte = ${req.body.contribuinte || 'contribuinte'},
            taxa_entrega = ${req.body.taxa_entrega || 'taxa_entrega'}
            where id_cliente = ${req.body.id}
        `)

        res.json({
            ok: true
        })
    }
}