import { db } from "../../../common/ex_sql_relatorio";

export default async (lojasId, filtros) => {
    const whereGrupo = filtros.grupo ? `and tg.grupo = '${filtros.grupo}'` : ''

    const rows = await db(`select 
    tp.id,
    tp.descricao,
    tg.grupo,
    coalesce(tc.nome, 'Não informado') cliente,
    tp.valor,
    tp.vencimento
    from tb_receber tp
    left join tb_cliente tc on tc.id_cliente = tp.id_cliente
    inner join tb_grupofin tg on tg.idgrupo = tp.id_grupo
    where vencimento >= '${filtros.dataIni}'::date and vencimento <= '${filtros.dataFim}'::date
    and tp.status = 0
    ${whereGrupo}
    order by tp.vencimento`).execute(lojasId);

    return rows;
}
