import { situacoesNfe } from '../../../common/constants';
import { db } from '../../../common/ex_sql_relatorio';

export default async (req) => {
    const rows = await db(`
    select 
      descricao, grupo, sum(vl_total_nf) as valor 
    from 
    (
    select 
        f.descricao, f.grupo, f.id, P.VALOR - CASE WHEN p.FORMA_PAGAMENTO=1 then coalesce(v.VL_TROCO,0) ELSE 0 end as vl_total_nf
    from 
        tb_nfe v 
    inner join
        tb_nfe_pagamento p on v.serie = p.serie and v.numero = p.numero 
    inner join
        tb_forma_pagamento f on p.forma_pagamento = f.id
    inner join
        tb_caixa_movimento c on v.id_caixa_movimento = c.id_caixa_movimento 
    where
        c.data_abertura::date >= '${req.body.dataIni}' and c.data_abertura::date <= '${req.body.dataFim}' and v.situacao ${situacoesNfe[req.body.situacaoNfe || 'TUDO']} and f.ativo ='S'
    ) aa
    group by descricao, grupo
    order by grupo`).execute(req.body.lojasId);

    return rows.reduce((acc, row) => {
        if (!Object.keys(acc).includes(row.descricao)) acc[row.descricao] = 0;
        acc[row.descricao] += parseFloat(row.valor)
        return acc;
    }, {})
}
