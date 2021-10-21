import { db } from "../../../common/ex_sql_relatorio";

export default async (lojasId, filtros) => {
    const rows = await db(`select 
    tp.id,
    tp.descricao,
    tp.vencimento::date,
    coalesce(tf.nome, 'Não informado') fornecedor,
    tp.valor,
    tp.vencimento
    from tb_pagar tp
    left join tb_fornecedor tf on tf.id_fornecedor = tp.id_fornecedor
    where vencimento >= '${filtros.dataIni}'::date and vencimento <= '${filtros.dataFim}'::date
    and tp.status = 0
    order by tp.vencimento`).execute(lojasId);

    return rows
}
