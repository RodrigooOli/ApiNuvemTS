import { db } from '../../../common/ex_sql_relatorio';

export default async (req) => {
    const rows = await db(`SELECT
    sum(entradas) AS entradas, 
    sum(saidas) AS saidas, 
    sum(entradas-saidas) AS saldo, 
    ('${req.body.dataFim}'::date - '${req.body.dataIni}'::DATE) as dias,
    round(sum(entradas/(('${req.body.dataFim}'::date - '${req.body.dataIni}'::DATE)+1)),2) as media_diaria,
    round(sum(entradas/(('${req.body.dataFim}'::date - '${req.body.dataIni}'::DATE)+1)) * 30,2) as previsao_30_dias 
    FROM 
    (
    (SELECT sum(p.valor_pago) AS saidas, 0 AS entradas FROM TB_PAGAR p WHERE data_pagamento::date >= '${req.body.dataIni}' AND data_pagamento::date <= '${req.body.dataFim}' and status=1
    UNION
    SELECT sum(d.VALOR_DESPESA) AS saidas, 0 AS entradas FROM TB_DESPESA d WHERE d.DATA_DESPESA::date >= '${req.body.dataIni}' AND d.DATA_DESPESA::date <= '${req.body.dataFim}'
    UNION
    SELECT 0 AS saidas, sum(P.VALOR) - sum(CASE WHEN p.FORMA_PAGAMENTO=1 then coalesce(v.VL_TROCO,0) ELSE 0 end) AS entradas FROM TB_NFE v 
    inner join tb_nfe_pagamento p on v.serie = p.serie and p.numero = v.numero 
    inner join tb_forma_pagamento f on p.forma_pagamento=f.id 
    inner join tb_caixa_movimento cx on v.id_caixa_movimento=cx.id_caixa_movimento 
    WHERE cx.data_abertura::date >= '${req.body.dataIni}' AND cx.data_abertura::date <= '${req.body.dataFim}' and v.situacao in ('E','O') and f.ativo ='S' and f.id <> 5
    union all
	select 
	0 as saidas,
	tcr.valor_receb as entradas
	from tb_convenio_receb tcr 
	WHERE tcr.data_receb::date >= '${req.body.dataIni}' AND tcr.data_receb::date <= '${req.body.dataFim}')
    ) as total`).execute(req.body.lojasId);

    return rows.reduce((acc, row) => {
        acc.entradas += parseFloat(row.entradas);
        acc.saidas += parseFloat(row.saidas);
        acc.saldo += parseFloat(row.saldo);
        acc.previsao_30_dias += parseFloat(row.previsao_30_dias);
        return acc;
    }, {
        entradas: 0,
        saidas: 0,
        saldo: 0,
        previsao_30_dias: 0,
    })
}
