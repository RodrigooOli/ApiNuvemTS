import { situacoesNfe } from '../../../common/constants';
import { db } from '../../../common/ex_sql_relatorio';
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection()

export default async (req) => {
    const lojas = await pgSql(`select id, nome from tb_lojas where id in (${req.body.lojasId.map(id => `'${id}'`).join(',')})`)

    const rows = await db(`
        SELECT
        coalesce (sum(atendimentos), 0) AS atendimentos,
        coalesce (sum(entradas), 0) AS faturamento
        FROM 
        (
            SELECT sum(P.VALOR) - sum(CASE WHEN p.FORMA_PAGAMENTO=1 then coalesce(v.VL_TROCO,0) ELSE 0 end) AS entradas,
            (	
                select count(1) from tb_nfe tn
                inner join tb_caixa_movimento tcm on  tn.id_caixa_movimento = tcm.id_caixa_movimento
                where tcm.data_abertura >= '${req.body.dataIni}' and tcm.data_abertura <= '${req.body.dataFim} 23:59' and tn.situacao ${situacoesNfe[req.body.situacaoNfe || 'TUDO']}
            ) atendimentos
            FROM TB_NFE v
            inner join tb_nfe_pagamento p
            on v.serie = p.serie and p.numero = v.numero
            inner join tb_forma_pagamento f
            on p.forma_pagamento = f.id
            inner join tb_caixa_movimento cx
            on v.id_caixa_movimento = cx.id_caixa_movimento
            WHERE cx.data_abertura::date >= '${req.body.dataIni}' 
            AND cx.data_abertura::date <= '${req.body.dataFim}' 
            and v.situacao ${situacoesNfe[req.body.situacaoNfe || 'TUDO']}
            and f.ativo ='S'
        ) as total
    `).execute(req.body.lojasId);

    const result = rows.reduce((acc, loja) => {
        const idNomeLoja = lojas.find(l => l.id === loja.idLoja)

        if (!Object.keys(acc).includes(idNomeLoja.nome)) acc[idNomeLoja.nome] = 0;

        acc[idNomeLoja.nome] += +loja.faturamento
        return acc;
    }, {})

    return {
        grafico: result,
        relatorio: rows.map(r => ({
            ...r,
            loja: lojas.find(l => l.id === r.idLoja).nome,
            atendimentos: +r.atendimentos,
            faturamento: +r.faturamento,
            ticket_medio: (+r.faturamento / +r.atendimentos) || 0,
            porcento: +((+r.faturamento / rows.reduce((acc, r) => acc += +r.faturamento, 0)) * 100).toFixed(2)
        })).sort((a, b) => a.loja.toUpperCase() > b.loja.toUpperCase() ? 1 : -1)
    };
}
