import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'


export default new class extends RouterFn {
    constructor() { super('/retaguarda/proximo_cod_interno', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        const options: ClientConfig = {
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: `d${req.body.idLoja}`,
            port: 5432
        }

        const pgSql = pgConnection(options)

        const rows = await pgSql(`SELECT
            COALESCE(t.cod_ant,-1) + 1 AS livre
            from
            (
                select (
                    select
                    p1.cod_interno
                    from tb_produto p1
                    where p1.cod_interno < p.cod_interno
                    order by p1.cod_interno desc
                    limit 1
                ) cod_ant,
                p.cod_interno
                from tb_produto p 
                order by p.cod_interno
            ) t
            where t.cod_ant <> t.cod_interno -1 and t.cod_ant > 0
            limit 1
        `)

        res.json({
            ok: true,
            body: rows[0]['livre']
        })
    }
}