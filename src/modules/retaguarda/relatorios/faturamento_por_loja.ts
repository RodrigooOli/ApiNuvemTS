import { situacoesNfe } from "../../../common/constants";
import { db } from "../../../common/ex_sql_relatorio";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection()

export default async (ids, filtros) => {
    const lojas = await pgSql(`select id, nome from tb_lojas where id_franquia = ${filtros.idFranquia} and id <> 'dump' ${!!filtros.apenasAtivas ? 'and not chave isnull' : ''}`)
    const lojasId = lojas.map(l => l.id)

    const rows = await db(`
        SELECT
        coalesce (sum(entradas), 0) AS faturamento
        FROM 
        (
            SELECT sum(P.VALOR) - sum(CASE WHEN p.FORMA_PAGAMENTO=1 then coalesce(v.VL_TROCO,0) ELSE 0 end) AS entradas FROM TB_NFE v 
            inner join tb_nfe_pagamento p on v.serie = p.serie and p.numero = v.numero 
            inner join tb_forma_pagamento f on p.forma_pagamento = f.id 
            inner join tb_caixa_movimento cx on v.id_caixa_movimento=cx.id_caixa_movimento 
            WHERE cx.data_abertura::date >= '${filtros.dataIni}' AND cx.data_abertura::date <= '${filtros.dataFim}' and v.situacao ${situacoesNfe[filtros.situacaoNfe || 'TUDO']} and f.ativo ='S' and f.id <> 5
            union all
            select   
            tcr.valor_receb as faturamento
            from tb_convenio_receb tcr 
            WHERE tcr.data_receb::date >= '${filtros.dataIni}' AND tcr.data_receb::date <= '${filtros.dataFim}'
        ) as total
    `).execute(lojasId);

    return rows.map(r => ({
        ...r,
        loja: lojas.find(l => l.id === r.idLoja).nome,
        faturamento: Number(r.faturamento),
    }));
}
