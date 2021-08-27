import { db } from "../../../common/ex_sql_relatorio";

export default async (lojasId, filtros) => {
    const rows = await db(`select
    case when c.tipo = 2 then 'ATENDIMENTO' else 'CAIXA' end as local,
    o.nome, c.data_canc, 
    p.descricao, 
    c.valor 
    from tb_cancelamentos c inner join tb_produto p on c.id_produto=p.id_produto 
    inner join tb_operador o on c.id_operador=o.id_operador 
    where c.data_canc::date >= '${filtros.dataIni}' and c.data_canc::date <= '${filtros.dataFim}'
    order by o.nome, c.data_canc`).execute(lojasId);

    return rows;
}
