import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/load_produtos', 'POST') }

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

        const search = req.body.searchDescricao.searchDB()

        const where = [
            !req.body.searchDescricao ? '' : `replace(upper(tp.descricao), ' ', '') like upper('%${search}%') or tp.cod_interno::text = '${search}' or tp.gtin::text = '${search}'`,
            !req.body.grupo ? '' : `tp.idgrupo = ${req.body.grupo}`,
            !req.body.subgrupo ? '' : `tp.idsubgrupo = ${req.body.subgrupo}`,
            `tp.ativo = ${!!req.body.ativos ? "'S'" : "'N'"}`,
            `tp.id_produto > 0`,
        ].filter(w => !!w)

        const orderBy = [
            !req.body.searchDescricao ? '' : `replace(upper(tp.descricao), ' ', '') like upper('${req.body.searchDescricao.searchDB()}%') desc`,
            !req.body.searchDescricao ? '' : `tp.cod_interno::text = upper('${req.body.searchDescricao.searchDB()}') desc`,
            !req.body.searchDescricao ? '' : `tp.gtin::text = upper('${req.body.searchDescricao.searchDB()}') desc`,
        ].filter(o => !!o)

        if (!orderBy.length) orderBy.push('tp.id_produto')

        const rCount = await pgSql(`select count(1) as qtd
            from tb_produto tp
            where ${where.join(' and ')}
        `)

        const rows = await pgSql(`select
            id_produto,
            tp.cod_interno,
            tp.gtin,
            tp.descricao,
            tp.und,
            tp.vl_unitario
            from tb_produto tp
            where ${where.join(' and ')}
            order by ${orderBy.join(', ')}
            limit 50 offset ${50 * req.body.pageIndex || 0}
        `)

        res.json({
            ok: true,
            body: {
                list: rows,
                qtd: rCount[0]['qtd'],
                qtdPages: rCount[0]['qtd'] > 50 ? Math.round(rCount[0]['qtd'] / 50) : 1
            }
        })
    }
}