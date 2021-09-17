import { cnpj, cpf } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_fornecedor', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
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

        const rows = await pgSql(`insert into tb_fornecedor (
            cpf_cnpj,
            rg_ie,
            nome,
            fantasia,
            cep,
            endereco,
            numero,
            bairro,
            cidade,
            uf,
            complemento,
            fone,
            cel,
            ativo,
            email,
            email2,
            contato
        ) values (
            '${req.body.cpfCnpj || ''}',
            '${req.body.rgie || ''}',
            '${req.body.nome || ''}',
            '${req.body.fantasia || ''}',
            '${req.body.cep || ''}',
            '${req.body.endereco || ''}',
            '${req.body.numero || ''}',
            '${req.body.bairro || ''}',
            '${req.body.cidade || ''}',
            '${req.body.uf || ''}',
            '${req.body.complemento || ''}',
            '${req.body.fone || ''}',
            '${req.body.cel || ''}',
            ${!!req.body.ativo ? 1 : 0},
            '${req.body.email || ''}',
            '${req.body.email2 || ''}',
            '${req.body.contato || ''}'
        ) returning *`)

        res.json({
            ok: true,
            body: rows[0]
        })
    }
}