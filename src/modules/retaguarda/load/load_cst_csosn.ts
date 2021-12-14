import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from '../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/load_cst_csosn', 'POST') }

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

        const rows = await pgSql(`select * from tb_cst`)

        res.json({
            ok: true,
            body: {
                cst: rows.filter(r => r.id_cst < 100).map(r => ({
                    ...r,
                    descricao: `${r.id_cst} - ${r.descricao}`
                })),
                csosn: rows.filter(r => r.id_cst >= 100).map(r => ({
                    ...r,
                    descricao: `${r.id_cst} - ${r.descricao}`
                })),
            }
        })
    }
}