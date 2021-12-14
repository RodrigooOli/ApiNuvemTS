import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/load_subgrupos', 'POST') }

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

        const rows = await pgSql(`select
        ts.idsubgrupo,
        ts.idgrupo,
        ts.subgrupo,
        tg.grupo as nome_grupo,
        ts.ativo
        from tb_subgrupo ts
        inner join tb_grupo tg
        on tg.idgrupo = ts.idgrupo
        where tg.ativo = 1
        ${!!req.body.idGrupo ? `and ts.idgrupo = ${req.body.idGrupo}` : ''}
        ${!!req.body.soAtivos ? 'and ts.ativo = 1' : ''}
        order by subgrupo`)

        res.json({
            ok: true,
            body: rows
        })
    }
}