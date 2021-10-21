import { db } from "../../../common/ex_sql_relatorio";

export default async (lojasId, filtros) => {
    const whereGrupo = filtros.grupo ? `and tg.grupo = '${filtros.grupo}'` : ''

    const rows = await db(`select 
    tp.id,
    tp.descricao,
    tg.grupo,
    coalesce(tf.nome, 'Não informado') fornecedor,
    tp.valor,
    tp.vencimento
    from tb_pagar tp
    left join tb_fornecedor tf on tf.id_fornecedor = tp.id_fornecedor
    inner join tb_grupofin tg on tg.idgrupo = tp.id_grupo
    where vencimento >= '${filtros.dataIni}'::date and vencimento <= '${filtros.dataFim}'::date
    and tp.status = 0
    ${whereGrupo}
    order by tp.vencimento`).execute(lojasId);

    return rows;
}
