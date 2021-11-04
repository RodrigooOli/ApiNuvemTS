import { db } from "../../../common/ex_sql_relatorio";

export default async (lojasId, filtros) => {
    const rows = await db(`select 
    m.id_caixa as caixa, 
    m.id_turno as turno,
    ss.tipo_emissao,
    case when ss.hora is null then m.data_abertura else ss.hora end, 
    ss.anotacao, 
    case when lower(ss.tipo_emissao)='c' then ss.vl_emissao else 0 end as suprimento,
    case when lower(ss.tipo_emissao)='d' then ss.vl_emissao else 0 end as sangria 
    from tb_suprimento_sangria ss 
    inner join tb_caixa_movimento m 
    on ss.id_caixa_movimento = m.id_caixa_movimento 
    where m.data_abertura::date >= '${filtros.dataIni}' and m.data_abertura::date <= '${filtros.dataFim}'
    order by m.data_abertura, ss.hora`).execute(lojasId);

    return rows;
}
