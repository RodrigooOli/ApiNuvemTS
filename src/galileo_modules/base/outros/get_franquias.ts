import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/franquias', 'GET') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`select * from tb_franquias order by nome`);

        res.json({
            ok: true,
            body: rows
        })
    }
}