import { db } from '../../../common/ex_sql_relatorio';

export default async (req) => {
    const rows = await db(`
    select 
    datareg, 
    sum(vendas) vendas, 
    sum(despesas) despesas,
    sum(vendas-despesas) saldo 
    from (select cx.dt_abt as datareg, 
    coalesce(sum(p.valor) - sum(CASE WHEN p.FORMA_PAGAMENTO=1 then coalesce(n.VL_TROCO,0) ELSE 0 end),0) as vendas,
    (select coalesce(sum(valor_despesa),0) from tb_despesa where data_despesa::date >= (cx.dt_abt || ' 00:00:00')::date and data_despesa::date <= (cx.dt_abt || ' 23:59:59')::date) as despesas 
    from tb_nfe_pagamento p 
    inner join tb_nfe n on n.serie=p.serie and n.numero=p.numero 
    inner join tb_forma_pagamento f on p.forma_pagamento=f.id 
    inner join tb_caixa_movimento cx on n.id_caixa_movimento=cx.id_caixa_movimento 
    where cx.dt_abt >= '${req.body.dataIni}' and cx.dt_abt <= '${req.body.dataFim}' and n.situacao in ('E','O') and f.ativo ='S' and f.id <> 5
    group by cx.dt_abt union all select p.data_pagamento as datareg, 0 as vendas, coalesce(sum(valor_pago),0) as despesas 
    from tb_pagar p 
    where p.data_pagamento >= '${req.body.dataIni}' and p.data_pagamento <= '${req.body.dataFim}' and status=1 group by p.data_pagamento) as s1 group by datareg order by datareg`).execute(req.body.lojasId)

    const saldoPorDia = rows.reduce((acc, fat) => {
        const key = fat.datareg.toLocaleDateString();

        if (!Object.keys(acc).includes(key)) acc[key] = 0;
        acc[key] += parseFloat(fat.saldo)

        return acc;
    }, {})

    return saldoPorDia
}