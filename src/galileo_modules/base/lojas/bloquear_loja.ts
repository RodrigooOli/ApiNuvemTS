import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/bloqueio_loja', 'POST') }

    async fn(req: Request, res: Response) {
        await pgSql(`update tb_lojas set bloqueado = (
            select case when bloqueado = 0 then 1 else 0 end from tb_lojas where id = '${req.body.id}'
        ) where id = '${req.body.id}'`);

        res.json({
            ok: true
        })
    }
}