import { db } from "../../../common/ex_sql_relatorio";

export default async (LojasId, filtros) => {
  return await db(`
  select 
  datareg,
  sum(dinheiro) as DINHEIRO,
  sum(pix) as PIX,
  sum(credito) as CREDITO,
  sum(debito) as DEBITO,
  sum(troca) as TROCA,
  sum(outros) as OUTROS,
  sum(voucher) as VOUCHER,
  sum(recebimento_convenio) as RECEBIMENTO_CONVENIO,
  round((sum(dinheiro) + sum(pix) + sum(credito) + sum(debito) + sum(troca) + sum(voucher) + sum(outros) + sum(recebimento_convenio)),2) as TOTALSEMPRAZO,
  sum(prazo) as PRAZO,
  round((sum(dinheiro) + sum(pix) + sum(credito) + sum(debito) + sum(prazo) + sum(troca) + sum(voucher) + sum(outros) + sum(recebimento_convenio)),2) as TOTALCOMPRAZO,
  sum(pagamentos) as PAGAMENTOS,
  round((sum(dinheiro) + sum(pix) + sum(credito) + sum(debito) + sum(troca) + sum(voucher) + sum(outros) + sum(recebimento_convenio) - sum(pagamentos)),2) as LIQUIDOSEMPRAZO,
  sum(qtdvendas) as QTDVENDAS,
  round((sum(dinheiro) + sum(pix) + sum(credito) + sum(debito) + sum(prazo) + sum(troca) + sum(voucher) + sum(outros)) / count(*),2) as TKMEDIO
  from (
  select cx.data_abertura::date as datareg, 
  case when f.grupo = 1 then
    coalesce(p.valor - n.vl_troco ,0) else 0 end as dinheiro,
  case when f.grupo = 2 then
    coalesce(p.valor,0) else 0 end as PIX,
  case when f.grupo = 3 then
    coalesce(p.valor,0) else 0 end as CREDITO,
  case when f.grupo = 4 then
    coalesce(p.valor,0) else 0 end as DEBITO,
  case when f.grupo = 5 then
    coalesce(p.valor,0) else 0 end as PRAZO,
0 as recebimento_convenio,
  case when f.grupo = 6 then
    coalesce(p.valor,0) else 0 end as VOUCHER,
  case when f.grupo = 7 then
    coalesce(p.valor,0) else 0 end as TROCA,
  case when f.grupo = 8 then
    coalesce(p.valor,0) else 0 end as OUTROS,
  0 as pagamentos,
  1 as qtdvendas
  from tb_nfe_pagamento p 
  inner join tb_nfe n on n.serie=p.serie and n.numero=p.numero 
  inner join tb_forma_pagamento f on p.forma_pagamento=f.id 
  inner join tb_caixa_movimento cx on  n.id_caixa_movimento=cx.id_caixa_movimento 
  where cx.data_abertura::date >= '${filtros.dataIni}' and cx.data_abertura::date <= '${filtros.dataFim}' and n.situacao in ('E','O') and f.ativo ='S'
  union all
  SELECT pg.data_pagamento::date as datareg, 
  0 as dinheiro,
  0 as pix,
  0 as credito,
  0 as debito,
  0 as prazo,
  0 as recebimento_convenio,
  0 as voucher,
  0 as troca,
  0 as outros,
  pg.valor_pago as pagamentos,
    0 as qtdvendas
  FROM TB_PAGAR pg 
  WHERE pg.data_pagamento::date >= '${filtros.dataIni}' AND pg.data_pagamento::date <= '${filtros.dataFim}' and pg.status=1
  union all
  SELECT 
  d.data_despesa::date as datareg,
  0 as dinheiro,
  0 as pix,
  0 as credito,
  0 as debito,
  0 as prazo,
  0 as recebimento_convenio,
  0 as voucher,
  0 as troca,
  0 as outros,
  d.VALOR_DESPESA as pagamentos,
    0 as qtdvendas
  FROM TB_DESPESA d WHERE d.DATA_DESPESA::date >= '${filtros.dataIni}' AND d.DATA_DESPESA::date <= '${filtros.dataFim}'
    union all
    select tcr.data_receb::date as datareg,
  0 as dinheiro,
  0 as pix,
  0 as credito,
  0 as debito,
  0 as prazo,
  tcr.valor_receb as recebimento_convenio,
  0 as voucher,
  0 as troca,
  0 as outros,
  0 as pagamentos,
    0 as qtdvendas
  from tb_convenio_receb tcr 
  WHERE tcr.data_receb::date >= '${filtros.dataIni}' AND tcr.data_receb::date <= '${filtros.dataFim}'
  ) t
  group by datareg`).execute(LojasId);
}