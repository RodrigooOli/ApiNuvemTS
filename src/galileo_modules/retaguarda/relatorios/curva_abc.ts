import { db } from "../../../common/ex_sql_relatorio";

export default async (LojasId, filtros) => {

    const whereGrupo = filtros.grupo === 'TODOS OS GRUPOS' || filtros.subgrupo !== 'TODOS OS SUBGRUPOS' ? '' : `and tg.grupo = '${filtros.grupo}'`
    const whereSubgrupo = filtros.subgrupo === 'TODOS OS SUBGRUPOS' ? '' : `and ts.subgrupo = '${filtros.subgrupo}'`
    const whereProdutos = filtros.produto === 'TODOS OS PRODUTOS' ? '' : `and tp.descricao = '${filtros.produto}'`

    const res = await db(`
    select 
    left(d2.descricao,20) as descricao,
    d2.valoritem,
    d2.quantidade,
    d2.und,
    d2.vendas,
    d2.total_geral,
    round(d2.percentual,2) as percentualitem,
    round(d2.pacumulado,2) as pacumulado,
    case
        when d2.pacumulado <= 80 then 'A'
        when d2.pacumulado <= 95 then 'B'
        else 'C'
    end curva
    from (
        select 
        d1.descricao,
        d1.valoritem,
        d1.quantidade,
        d1.und,
        d1.vendas,
        d1.total_geral,
        d1.percentual,
        sum(d1.percentual) over(order by d1.percentual desc) pacumulado
        from (
            select 
            d.descricao,
            d.valoritem,
            sum(d.valoritem) over() total_geral,
            cast(d.valoritem as numeric (15,3)) / cast(sum(d.valoritem) over() as numeric (15,3)) * 100 percentual,
            d.quantidade,
            d.und,
            d.vendas
            from (
            	select i.descricao, sum(i.vl_total) as valoritem, sum(i.quantidade) as quantidade, i.und, case when i.und = 'KG' then count(*) else 0 end as vendas 
                from tb_nfe_item i 
                inner join tb_nfe v on v.serie = i.serie and v.numero = i.numero
                inner join tb_caixa_movimento c on v.id_caixa_movimento = c.id_caixa_movimento 
                inner join tb_nfe_pagamento p on p.serie = v.serie and p.numero = v.numero 
                inner join tb_forma_pagamento f on f.id = p.forma_pagamento 
                inner join tb_produto tp on tp.id_produto = i.id_produto 
                left join tb_grupo tg 
                on tg.idgrupo = tp.idgrupo
                left join tb_subgrupo ts 
                on ts.idsubgrupo = tp.idsubgrupo 
                where c.data_abertura::date >= '${filtros.dataIni}'
                and c.data_abertura::date   <= '${filtros.dataFim}'
                and v.situacao in ('E','O') and f.ativo = 'S'
                ${whereGrupo}
                ${whereSubgrupo}
                ${whereProdutos}
                group by i.descricao, i.und
                order by 2 desc
           ) d
        ) d1
    ) d2`).execute(LojasId);

    return res;
}
