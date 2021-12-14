import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/verifica_matriz', 'POST') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`select 1 from tb_lojas tl where tl.id_franquia = ${req.body.idFranquia} and tl.matriz`);

        res.json({
            ok: true,
            body: {
                existe: !!rows.length
            }
        })
    }
}