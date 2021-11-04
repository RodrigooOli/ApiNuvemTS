import { situacoesNfe } from '../../../common/constants';
import { db } from '../../../common/ex_sql_relatorio';
import { dataEmDias } from '../../../utils/ultils';

export default async (req) => {
    const rows = await db(`SELECT
    sum(bruto) as bruto, 
    sum(prazo) as prazo,
    sum(bruto) - sum(prazo) as receita,
    sum(despesa) as despesa,
    (sum(bruto) - sum(prazo)) - sum(despesa) as liquido
    FROM 
    (
        SELECT 
        sum(d.VALOR_DESPESA) AS despesa, 
        0 as bruto,
        0 as prazo
        FROM TB_DESPESA d 
        WHERE d.DATA_DESPESA::date >= '${req.body.dataIni}' AND d.DATA_DESPESA::date <= '${req.body.dataFim}'
        ---------
        union all
        ---------
        SELECT 0 AS despesas, 
        sum(P.VALOR) - sum(CASE WHEN p.FORMA_PAGAMENTO = 1 then coalesce(v.VL_TROCO, 0) ELSE 0 end) AS bruto,
        sum(case when p.FORMA_PAGAMENTO <> 5 then 0 else P.VALOR end) as prazo
        FROM TB_NFE v
        inner join tb_nfe_pagamento p on v.serie = p.serie and p.numero = v.numero 
        inner join tb_forma_pagamento f on p.forma_pagamento=f.id 
        inner join tb_caixa_movimento cx on v.id_caixa_movimento=cx.id_caixa_movimento 
        WHERE cx.data_abertura::date >= '${req.body.dataIni}' AND cx.data_abertura::date <= '${req.body.dataFim}' 
        and v.situacao ${situacoesNfe[req.body.situacaoNfe || 'TUDO']}
        and f.ativo ='S' 
        ---------
        union all
        ---------
        select 
        0 as despesa,
        tcr.valor_receb as bruto,
        0 as prazo
        from tb_convenio_receb tcr 
        WHERE tcr.data_receb::date >= '${req.body.dataIni}' AND tcr.data_receb::date <= '${req.body.dataFim}'
        ---------
        union all	
        ---------
        select 
        case when valor_pago > 0 then valor_pago else valor end as despesa, 
        0 as bruto,
        0 as prazo
        from tb_pagar tp 
        where vencimento::date >= '${req.body.dataIni}' AND vencimento::date <= '${req.body.dataFim}'
        ---------
        union all
        ---------
        select 0 despesa, 
        case when valor_recebido > 0 then valor_recebido else valor end as bruto,
        0 as prazo
        from tb_receber tr
        where vencimento::date >= '${req.body.dataIni}' AND vencimento::date <= '${req.body.dataFim}'
    ) as total`).execute(req.body.lojasId)

    const totais = rows.reduce((acc, row) => {
        acc.bruto += Number(row.bruto);
        acc.prazo += Number(row.prazo);
        acc.receita += Number(row.receita);
        acc.despesa += Number(row.despesa);
        acc.liquido += Number(row.liquido);
        return acc;
    }, {
        bruto: 0,
        prazo: 0,
        receita: 0,
        despesa: 0,
        liquido: 0,
    })

    const dataComFaturamento = Date.parse(`${req.body.dataFim} `) > Date.now() ? Date.now() : Date.parse(`${req.body.dataFim} `)

    return {
        ...totais,
        dias: dataEmDias(Date.parse(`${req.body.dataFim} `) - Date.parse(`${req.body.dataIni} `)),
        faturamento_final: (totais.bruto / dataEmDias(dataComFaturamento - Date.parse(`${req.body.dataIni} `))) * dataEmDias(Date.parse(`${req.body.dataFim} `) - Date.parse(`${req.body.dataIni} `)),
        faturamento_30_dias: (totais.bruto / dataEmDias(dataComFaturamento - Date.parse(`${req.body.dataIni} `))) * 30
    };
}
