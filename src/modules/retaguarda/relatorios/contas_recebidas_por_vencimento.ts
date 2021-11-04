import { db } from "../../../common/ex_sql_relatorio";

export default async (lojasId, filtros) => {
    const rows = await db(`select 
    tr.id,
    tr.descricao,
    tr.vencimento::date,
    coalesce(tc.nome, 'Não informado') cliente,
    tr.valor_recebido,
    tr.data_recebimento
    from tb_receber tr
    left join tb_cliente tc on tc.id_cliente = tr.id_cliente
    where vencimento >= '${filtros.dataIni}'::date and vencimento <= '${filtros.dataFim}'::date
    and tr.status = 1
    order by tr.vencimento`).execute(lojasId);

    return rows
}
