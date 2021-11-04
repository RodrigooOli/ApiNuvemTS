import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { verificaContasRecorrente } from "./verifica_contas_recorrente";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/load_contas_a_pagar', 'POST') }

    async fn(req: Request, res: Response) {
        const filtros = req.body.filtros;

        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        await verificaContasRecorrente(req);

        const options: ClientConfig = {
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: `d${req.body.idLoja}`,
            port: 5432
        }

        const pgSql = pgConnection(options)

        const whereGrupo = filtros.grupo ? `and id_grupo = ${filtros.grupo}` : ''
        const whereSubgrupo = filtros.subgrupo ? `and id_subgrupo = ${filtros.subgrupo}` : ''

        const rows = await pgSql(`select 
            tp.*,
            coalesce(tc.nome, '') as carteira,
            tg.grupo,
            ts.subgrupo
            from tb_pagar tp
            left join tb_carteira tc on tp.id_carteira = tc.id_carteira
            inner join tb_grupofin tg on tg.idgrupo = tp.id_grupo
            inner join tb_subgrupofin ts on ts.idsubgrupo = tp.id_subgrupo
            where vencimento >= '${filtros.dataIni}'::date and vencimento <= '${filtros.dataFim}'::date
            ${whereGrupo} ${whereSubgrupo}
            order by tp.vencimento
        `)

        res.json({
            ok: true,
            body: rows
        })
    }
}