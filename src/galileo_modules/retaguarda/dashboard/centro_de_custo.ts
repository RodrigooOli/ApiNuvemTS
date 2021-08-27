import { db } from '../../../common/ex_sql_relatorio';

export default async (req) => {
    const rCentroDeCusto = await db(`
    select
        g.grupo,sum(p.valor_pago) as valor from tb_pagar p inner join tb_grupofin g on p.id_grupo = g.idgrupo
    where
        data_pagamento >= '${req.body.dataIni}' AND data_pagamento <= '${req.body.dataFim}' group by g.grupo
    union 
    SELECT 
        'DESPESAS CAIXA' as grupo,sum(d.VALOR_DESPESA) AS valor 
    FROM 
        TB_DESPESA d 
    WHERE 
        CAST(d.DATA_DESPESA AS date) >= '${req.body.dataIni}' AND CAST(d.DATA_DESPESA AS date) <= '${req.body.dataFim}' 
    union
    select 'ZZZTOTAL' as grupo, sum(valor) from (
    select
        valor_pago as valor
    from
        tb_pagar tp
    where
        data_pagamento >= '${req.body.dataIni}' AND data_pagamento <= '${req.body.dataFim}'
    union   
    SELECT 
        d.VALOR_DESPESA AS valor 
    FROM 
        TB_DESPESA d 
    WHERE 
        CAST(d.DATA_DESPESA AS date) >= '${req.body.dataIni}' AND CAST(d.DATA_DESPESA AS date) <= '${req.body.dataFim}' 
    ) aa order by grupo`).execute(req.body.lojasId)

    return rCentroDeCusto.reduce((acc, c) => {
        const ind = acc.findIndex(custo => custo.grupo === c.grupo);
        if (ind !== -1) {
            acc[ind].valor += parseFloat(c.valor)
        } else {
            acc.push({ ...c, valor: parseFloat(c.valor) })
        }
        return acc;
    }, [])
}
