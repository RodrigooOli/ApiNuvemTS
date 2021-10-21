import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { db } from "../../../common/ex_sql_relatorio";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_all_grupos_fin', 'POST') }

    async fn(req: Request, res: Response) {
        const wheres = [
            `ativo = ${!!req.body.soAtivos ? '1' : 'ativo'}`,
            `tipo = ${`'${req.body.tipo}'` || 'tipo'}`,
        ]

        const rows = await db(`select * from tb_grupofin where ${wheres.join(' and ')} order by grupo`).execute(req.body.lojasId)

        res.json({
            ok: true,
            body: rows
        })
    }
}