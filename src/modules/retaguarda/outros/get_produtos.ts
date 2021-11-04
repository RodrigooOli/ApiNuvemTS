import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { db } from "../../../common/ex_sql_relatorio";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_produtos', 'POST') }

    async fn(req: Request, res: Response) {
        let sql = '';

        if (req.body.subgrupo === 'TODOS OS SUBGRUPOS') {
            sql = `select descricao
           from tb_produto tp 
           inner join tb_grupo tg
           on tg.grupo = '${req.body.grupo}'
           where tp.idgrupo = tg.idgrupo `
        } else {
            sql = `select descricao
           from tb_produto tp 
           inner join tb_subgrupo ts 
           on ts.subgrupo = '${req.body.subgrupo}'
           where tp.idsubgrupo = ts.idsubgrupo`
        }

        const rows = await db(sql).execute(req.body.lojasId);

        res.json({
            ok: true,
            body: rows.map(p => p.descricao),
        })
    }
}