import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/lojas/:idRepresentante', 'GET') }

    async fn(req: Request, res: Response) {
        const where = req.params.idRepresentante === '*' ? '' : `where tl.id_representante = ${req.params.idRepresentante}`

        const rows = await pgSql(`select tl.*, tr.nome as nome_representante from tb_lojas tl inner join tb_representantes tr on tr.id = tl.id_representante ${where}`);

        res.json({
            ok: true,
            body: rows
        })
    }
}