import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { db } from "../../../common/ex_sql_relatorio";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_subgrupos', 'POST') }

    async fn(req: Request, res: Response) {
        const rows = await db(`
            select subgrupo from tb_subgrupo ts 
            inner join tb_grupo tg
            on tg.idgrupo = ts.idgrupo
            where tg.grupo = '${req.body.grupo}'
            `).execute(req.body.lojasId);

        const subgrupos = Object.keys(rows.reduce((acc, gr) => { acc[gr.subgrupo] = null; return acc; }, {}))

        res.json({
            ok: true,
            body: subgrupos.sort((sg1, sg2) => sg1 > sg2 ? 1 : -1),
        })
    }
}