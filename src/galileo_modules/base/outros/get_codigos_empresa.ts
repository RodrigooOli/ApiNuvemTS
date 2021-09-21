import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/codigos_empresa/:id', 'GET') }

    async fn(req: Request, res: Response) {
        const whereId = req.params.id === '*' ? '' : ` and id_representante = ${req.params.id}`

        const rows = await pgSql(`select nome, cod_cliente from tb_lojas where cod_cliente > 0 ${whereId} order by cod_cliente, nome`);

        res.json({
            ok: true,
            body: rows
        })
    }
}