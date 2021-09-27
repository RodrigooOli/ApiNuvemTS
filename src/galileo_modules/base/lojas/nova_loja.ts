import { cnpj, cpf } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/nova_loja', 'POST') }

    async fn(req: Request, res: Response) {
        try {
            if (!!req.body.cpfCnpj && !cpf.isValid(req.body.cpfCnpj) && !cnpj.isValid(req.body.cpfCnpj)) {
                res.json({
                    ok: false,
                    msg: 'CPF OU CNPJ NÃO É VÁLIDO'
                })
                return;
            }

            const rows = await pgSql(`insert into tb_lojas(
                cod_cliente,
                nome,
                plano,
                ativo,
                cpf_cnpj,
                id_franquia,
                id_representante
            ) values (
                ${req.body.codCliente === '###' ? 'default' : req.body.codCliente},
                '${(req.body.nome || '').replace(/'/g, "''")}',
                ${req.body.plano},
                ${req.body.ativo},
                ${!!req.body.cpfCnpj ? `'${req.body.cpfCnpj}'` : 'NULL'},
                ${req.body.franquia},
                ${req.body.idRepresentante}
            ) returning *`);

            if (!!rows[0]) await pgSql(`CREATE DATABASE d${rows[0].id} WITH TEMPLATE ddump OWNER postgres`);

            res.json({
                ok: true,
                body: {
                    ...rows[0],
                    nome_franquia: req.body.nomeFranquia
                }
            })
        } catch (e) {
            if (e.toString() === 'error: duplicate key value violates unique constraint "cnpj_unique"') {
                res.json({
                    ok: false,
                    msg: 'Já existe uma loja com esse CPF ou CNPJ'
                })
                return
            }
            throw e
        }
    }
}