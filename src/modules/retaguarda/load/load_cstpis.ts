import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from '../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/load_cstpis', 'POST') }

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

        const rows = await pgSql(`select * from tb_cstpis`)

        res.json({
            ok: true,
            body: rows.map(r => ({
                ...r,
                descricao: `${r.id_cstpis} - ${r.descricao}`
            }))
        })
    }
}