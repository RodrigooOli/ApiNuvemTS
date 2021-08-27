import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/codigos_empresa', 'GET') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`select nome, cod_cliente from tb_lojas order by cod_cliente, nome`);

        res.json({
            ok: true,
            body: rows
        })
    }
}