import { db } from "../../../common/ex_sql_relatorio"

export default async (lojasId, filtros) => {
    const rows = await db(`select 
    o.nome as autorizado_por,
    nf.dthr_saida,
    p.descricao,
    i.vl_desconto
    from tb_nfe nf 
    inner join tb_nfe_item i on nf.serie=i.serie and nf.numero=i.numero 
    inner join tb_operador o on i.id_operador=o.id_operador 
    inner join tb_produto p on i.id_produto=p.id_produto 
    where nf.dthr_saida::date >= '${filtros.dataIni}' and nf.dthr_saida::date <= '${filtros.dataFim}'
    order by o.nome, nf.dthr_saida`).execute(lojasId)

    return rows
}
