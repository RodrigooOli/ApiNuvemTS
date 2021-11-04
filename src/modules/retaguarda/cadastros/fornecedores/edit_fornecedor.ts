import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { cpf, cnpj } from 'cpf-cnpj-validator'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_fornecedor', 'POST') }

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
                msg: 'Fornecedor não foi identificado'
            })
            return;
        }

        if (!!req.body.cpfCnpj && !cpf.isValid(req.body.cpfCnpj) && !cnpj.isValid(req.body.cpfCnpj)) {
            res.json({
                ok: false,
                msg: 'CPF ou CNPJ inválido!'
            })
            return;
        }


        const options: ClientConfig = {
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: `d${req.body.idLoja}`,
            port: 5432
        }

        const pgSql = pgConnection(options)

        await pgSql(`update tb_fornecedor set
            cpf_cnpj = '${req.body.cpfCnpj || ''}',
            rg_ie = '${req.body.rgie || ''}',
            nome = '${req.body.nome || ''}',
            fantasia = '${req.body.fantasia || ''}',
            cep = '${req.body.cep || ''}',
            endereco = '${req.body.endereco || ''}',
            numero = '${req.body.numero || ''}',
            bairro = '${req.body.bairro || ''}',
            cidade = '${req.body.cidade || ''}',
            uf = '${req.body.uf || ''}',
            complemento = '${req.body.complemento || ''}',
            fone = '${req.body.fone || ''}',
            cel = '${req.body.cel || ''}',
            ativo = ${!!req.body.ativo ? 1 : 0},
            email = '${req.body.email || ''}',
            email2 = '${req.body.email2 || ''}',
            contato = '${req.body.contato || ''}'
            where id_fornecedor = ${req.body.id}
        `)

        res.json({
            ok: true
        })
    }
}