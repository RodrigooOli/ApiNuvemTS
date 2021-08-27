import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/novo_representante', 'POST') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`insert into tb_representantes(nome, celular, cpf_cnpj, interno) values ('${req.body.nome}', '${req.body.celular}', '${req.body.doc}', ${req.body.interno}) returning *`);

        res.json({
            ok: true,
            body: rows[0]
        })
    }
}