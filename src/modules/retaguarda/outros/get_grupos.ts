import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { db } from "../../../common/ex_sql_relatorio";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_grupos', 'POST') }

    async fn(req: Request, res: Response) {
        const rows = await db(`select grupo from tb_grupo`).execute(req.body.lojasId);

        const grupos = Object.keys(rows.reduce((acc, gr) => { acc[gr.grupo] = null; return acc; }, {})).sort((gr1, gr2) => gr1 > gr2 ? 1 : -1)

        res.json({
            ok: true,
            body: grupos,
        })
    }
}