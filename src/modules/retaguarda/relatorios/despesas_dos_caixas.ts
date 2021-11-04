import { db } from "../../../common/ex_sql_relatorio";

export default async (lojasId, filtros) => {
    const rows = await db(`select
    cx.nome as caixa,
    d.data_despesa,
    left(descricao,60) as descricao,
    valor_despesa as valor 
    from tb_despesa d 
    inner join tb_caixa_movimento cm 
    on d.id_caixa=cm.id_caixa_movimento 
    inner join tb_caixa cx on cm.id_caixa=cx.id_caixa 
    where cm.data_abertura::date >= '${filtros.dataIni}' and cm.data_abertura::date <= '${filtros.dataFim}' 
    order by cx.nome, d.data_despesa`).execute(lojasId);

    return rows;
}
