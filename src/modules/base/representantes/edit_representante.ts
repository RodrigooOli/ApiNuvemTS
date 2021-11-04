import { cnpj, cpf } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/edit_representante', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.id) throw 'ID NÃO FOI INFORMADO'

        if (!cpf.isValid(req.body.doc) && !cnpj.isValid(req.body.doc)) {
            res.json({
                ok: false,
                msg: 'CPF OU CNPJ INVÁLIDO'
            })
            return;
        }

        await pgSql(`update tb_representantes set 
            nome = '${req.body.nome}',
            celular = '${req.body.celular}',
            cpf_cnpj = '${req.body.doc}',
            ativo = ${!!req.body.ativo},
            supervisor =  ${!!req.body.supervisor},
            suporte =  '${JSON.stringify(req.body.suporte)}'
            where id = ${req.body.id}
        `);

        res.json({
            ok: true,
        })
    }
}