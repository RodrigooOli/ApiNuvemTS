import { situacoesNfe } from "../../../common/constants";
import { db } from "../../../common/ex_sql_relatorio";

const sql = (filtros) => {
  const peloSistema = `select *,
  (total / case when vendas <> 0 then vendas else 1 end) as ticket_medio
  from (
    select 
    id_turno,
    sum(dinheiro) as DINHEIRO,
    sum(pix) as PIX,
    sum(credito) as CREDITO,
    sum(debito) as DEBITO,
    sum(troca) as TROCA,
    sum(outros) as OUTROS,
    sum(voucher) as VOUCHER,
    round((sum(dinheiro) + sum(pix) + sum(credito) + sum(debito) + sum(troca) + sum(voucher) + sum(outros) + sum(recebimento)),2) as TOTAL,
    sum(despesa) as DESPESA,
    sum(pagamentos) as PAGAMENTOS,
    sum(recebimento) as RECEBIMENTOS,
    round((sum(dinheiro) + sum(pix) + sum(credito) + sum(debito) + sum(troca) + sum(voucher) + sum(outros) + sum(recebimento) - sum(despesa) - sum(pagamentos)),2) as LIQUIDO,
    (
      select count(1) from tb_nfe tn
      inner join tb_caixa_movimento tcm on  tn.id_caixa_movimento = tcm.id_caixa_movimento
      where tcm.data_abertura >= '${filtros.dataIni}' and tcm.data_abertura <= '${filtros.dataFim} 23:59' and tn.situacao ${situacoesNfe[filtros.situacaoNfe || 'TUDO']}
      and tcm.id_turno = t.id_turno
    ) vendas
    from (    
      select cx.id_turno,
      case when f.grupo = 1 then coalesce(p.valor - n.vl_troco ,0) else 0 end as dinheiro,
      case when f.grupo = 2 then coalesce(p.valor,0) else 0 end as PIX,
      case when f.grupo = 3 then coalesce(p.valor,0) else 0 end as CREDITO,
      case when f.grupo = 4 then coalesce(p.valor,0) else 0 end as DEBITO,
      case when f.grupo = 5 then coalesce(p.valor,0) else 0 end as PRAZO,
      case when f.grupo = 6 then coalesce(p.valor,0) else 0 end as VOUCHER,
      case when f.grupo = 7 then coalesce(p.valor,0) else 0 end as TROCA,
      case when f.grupo = 8 then coalesce(p.valor,0) else 0 end as OUTROS,
      0 as recebimento,
      0 as despesa,
      0 as pagamentos
      from tb_nfe_pagamento p 
      inner join tb_nfe n on n.serie=p.serie and n.numero=p.numero 
      inner join tb_forma_pagamento f on p.forma_pagamento=f.id 
      inner join tb_caixa_movimento cx on  n.id_caixa_movimento = cx.id_caixa_movimento 
      where cx.data_abertura::date >= '${filtros.dataIni}' and cx.data_abertura::date <= '${filtros.dataFim} 23:59' and n.situacao ${situacoesNfe[filtros.situacaoNfe || 'TUDO']} and f.ativo ='S'
      union all
      SELECT 
      cx.id_turno,
      0 as dinheiro,
      0 as pix,
      0 as credito,
      0 as debito,
      0 as prazo,
      0 as voucher,
      0 as troca,
      0 as outros,
      0 as recebimento,
      d.VALOR_DESPESA as despesa,
      0 as pagamentos
      FROM TB_DESPESA d 
      inner join tb_caixa_movimento cx on cx.id_caixa_movimento = d.id_caixa 
      WHERE d.DATA_DESPESA::date >= '${filtros.dataIni}' AND d.DATA_DESPESA::date <= '${filtros.dataFim} 23:59'
      union all
      select 
      9 as id_turno,
      0 as dinheiro,
      0 as pix,
      0 as credito,
      0 as debito,
      0 as prazo,
      0 as voucher,
      0 as troca,
      0 as outros,
      tcr.valor_receb as recebimento,
      0 as despesa,
      0 as pagamentos
      from tb_convenio_receb tcr
      WHERE tcr.data_receb::date >= '${filtros.dataIni}' AND tcr.data_receb::date <= '${filtros.dataFim} 23:59'    
      union all
      select 
      9 as id_turno,
      0 as dinheiro,
      0 as pix,
      0 as credito,
      0 as debito,
      0 as prazo,
      0 as voucher,
      0 as troca,
      0 as outros,
      0 as recebimento,
      0 as despesa,
      tp.valor_pago as pagamentos
      from tb_pagar tp 
      WHERE tp.data_pagamento::date >= '${filtros.dataIni}' AND tp.data_pagamento::date <= '${filtros.dataFim} 23:59'
    ) t
    group by id_turno
  ) s2`

  switch (filtros.origem) {
    case 'CONFERENCIA':
      return `select *,
      total / case when vendas <> 0 then vendas else 1 end as ticket_medio
      from (
        select 
        id_turno,
        sum(dinheiro) as DINHEIRO,
        sum(pix) as PIX,
        sum(credito) as CREDITO,
        sum(debito) as DEBITO,
        sum(troca) as TROCA,
        sum(outros) as OUTROS,
        sum(voucher) as VOUCHER,
        round((sum(dinheiro) + sum(pix) + sum(credito) + sum(debito) + sum(troca) + sum(voucher) + sum(outros) + sum(recebimento)),2) as TOTAL,
        sum(despesa) as DESPESA,
        sum(pagamentos) as PAGAMENTOS,
        sum(recebimento) as RECEBIMENTOS,
        round((sum(dinheiro) + sum(pix) + sum(credito) + sum(debito) + sum(troca) + sum(voucher) + sum(outros) + sum(recebimento) - sum(despesa) - sum(pagamentos)),2) as LIQUIDO,
        (	
          select count(1) from tb_nfe tn
          inner join tb_caixa_movimento tcm on  tn.id_caixa_movimento = tcm.id_caixa_movimento
          where tcm.data_abertura >= '${filtros.dataIni}' and tcm.data_abertura <= '${filtros.dataFim} 23:59' and tn.situacao ${situacoesNfe[filtros.situacaoNfe || 'TUDO']}
          and tcm.id_turno = t.id_turno
        ) vendas
        from (     
        select cx.id_turno, 
        case when cc.forma_pagamento = 1 then
          coalesce(cc.valor,0) else 0 end as dinheiro,
        case when cc.forma_pagamento = 2 then
          coalesce(cc.valor,0) else 0 end as PIX,
        case when cc.forma_pagamento = 3 then
          coalesce(cc.valor,0) else 0 end as CREDITO,
        case when cc.forma_pagamento = 4 then
          coalesce(cc.valor,0) else 0 end as DEBITO,
        case when cc.forma_pagamento = 5 then
          coalesce(cc.valor,0) else 0 end as PRAZO,
        case when cc.forma_pagamento = 6 then
          coalesce(cc.valor,0) else 0 end as VOUCHER,
        case when cc.forma_pagamento = 7 then
          coalesce(cc.valor,0) else 0 end as TROCA,
        case when cc.forma_pagamento = 8 then
          coalesce(cc.valor,0) else 0 end as OUTROS,
        0 as recebimento,
        0 as despesa,
        0 as pagamentos
        from tb_caixa_conferencia cc
        inner join tb_caixa_movimento cx on cc.grupo_conferencia = cx.grupo_conferencia 
        where cx.data_abertura::date >= '${filtros.dataIni}' and cx.data_abertura::date <= '${filtros.dataFim} 23:59'
        union all
        SELECT 
        cx.id_turno,
        0 as dinheiro,
        0 as pix,
        0 as credito,
        0 as debito,
        0 as prazo,
        0 as voucher,
        0 as troca,
        0 as outros,
        0 as recebimento,
        d.VALOR_DESPESA as despesa,
        0 as pagamentos
        FROM TB_DESPESA d 
        inner join tb_caixa_movimento cx on cx.id_caixa_movimento = d.id_caixa 
        WHERE d.DATA_DESPESA::date >= '${filtros.dataIni}' AND d.DATA_DESPESA::date <= '${filtros.dataFim} 23:59'
        ---------
        union all
        ---------
        SELECT 
        tcm.id_turno,
        sum(tss.vl_emissao) * -1 as dinheiro,
        0 as pix,
        0 as credito,
        0 as debito,
        0 as prazo,
        0 as voucher,
        0 as troca,
        0 as outros,
        0 as recebimento,
        0 as despesa,
        0 as pagamentos
        from tb_caixa_movimento tcm 
        inner join tb_suprimento_sangria tss 
        on tss.id_caixa_movimento = tcm.id_caixa_movimento and tss.anotacao = 'Fundo de Caixa'
        where tcm.DT_ABT >= '${filtros.dataIni}' AND tcm.DT_ABT <= '${filtros.dataFim}'
        group by tcm.id_turno
        ---------
        union all
        ---------
        select 
        9 as id_turno,
        0 as dinheiro,
        0 as pix,
        0 as credito,
        0 as debito,
        0 as prazo,
        0 as voucher,
        0 as troca,
        0 as outros,
        tcr.valor_receb as recebimento,
        0 as despesa,
        0 as pagamentos
        from tb_convenio_receb tcr
        WHERE tcr.data_receb::date >= '${filtros.dataIni}' AND tcr.data_receb::date <= '${filtros.dataFim} 23:59'    
        union all
        select 
        9 as id_turno,
        0 as dinheiro,
        0 as pix,
        0 as credito,
        0 as debito,
        0 as prazo,
        0 as voucher,
        0 as troca,
        0 as outros,
        0 as recebimento,
        0 as despesa,
        tp.valor_pago as pagamentos
        from tb_pagar tp 
        WHERE tp.data_pagamento::date >= '${filtros.dataIni}' AND tp.data_pagamento::date <= '${filtros.dataFim} 23:59'
        ) t
        group by id_turno
      ) s2`
      break;
    case 'SISTEMA':
      return peloSistema;
      break;

    default:
      return ''
      break;
  }
}

export default async (lojasId, filtros) => {
  const rows = await db(sql(filtros)).execute(lojasId);

  const result = rows.filter(r => r.id_turno !== 9).reduce((acc, row) => {
    const turno = acc.find((t) => t.id_turno === row.id_turno)

    if (!turno) {
      acc.push(row)
    } else {
      Object.keys(row).forEach((key) => {
        if (key === 'id' || key === 'id_turno') return;
        turno[key] = parseFloat(turno[key]) + parseFloat(row[key])
      })
    }

    return acc;
  }, [])

  let totalPeriodo = rows.find(r => r.id_turno === 9);

  if (!totalPeriodo && rows.length > 0) totalPeriodo = { ...Object.keys(rows[0]).reduce((acc, k) => { acc[k] = 0; return acc }, {}), id_turno: 9 }

  if (totalPeriodo) {
    Object.keys(totalPeriodo).forEach(key => {
      if (key === 'id' || key === 'id_turno') return;
      totalPeriodo[key] = parseFloat(totalPeriodo[key]) + result.reduce((acc, r) => acc += parseFloat(r[key]), 0)
    })

    result.push(totalPeriodo)
    totalPeriodo.ticket_medio = totalPeriodo.total / totalPeriodo.vendas || 1
  }

  return result;
}