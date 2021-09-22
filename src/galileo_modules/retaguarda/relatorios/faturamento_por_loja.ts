import { db } from "../../../common/ex_sql_relatorio";

export default async (lojasId, filtros) => {
    const rows = await db(`
        SELECT
        coalesce (sum(entradas), 0) AS faturamento
        FROM 
        (
            SELECT sum(P.VALOR) - sum(CASE WHEN p.FORMA_PAGAMENTO=1 then coalesce(v.VL_TROCO,0) ELSE 0 end) AS entradas FROM TB_NFE v 
            inner join tb_nfe_pagamento p on v.serie = p.serie and p.numero = v.numero 
            inner join tb_forma_pagamento f on p.forma_pagamento = f.id 
            inner join tb_caixa_movimento cx on v.id_caixa_movimento=cx.id_caixa_movimento 
            WHERE cx.data_abertura::date >= '${filtros.dataIni}' AND cx.data_abertura::date <= '${filtros.dataFim}' and v.situacao in ('E','O') and f.ativo ='S' and f.id <> 5
            union all
            select 
            tcr.valor_receb as faturamento
            from tb_convenio_receb tcr 
            WHERE tcr.data_receb::date >= '${filtros.dataIni}' AND tcr.data_receb::date <= '${filtros.dataFim}'
        ) as total
    `).execute(lojasId);

    return rows;
}
