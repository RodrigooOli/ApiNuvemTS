import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/nova_loja', 'POST') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`insert into tb_lojas(
            cod_cliente,
            nome,
            plano,
            id_representante
        ) values (
            ${req.body.codCliente == '###' ? 'default' : req.body.codCliente},
            '${req.body.nome}',
            ${req.body.plano},
            ${req.body.idRepresentante}
        ) returning *`);

        if (rows[0]) {
            await pgSql(`CREATE DATABASE d${rows[0].id} WITH TEMPLATE ddump OWNER postgres`)
            //await pgSql(`select dblink_connect(d${rows[0].id}, 'dados_server')`)
        }

        res.json({
            ok: true,
            body: rows[0]
        })
    }
}