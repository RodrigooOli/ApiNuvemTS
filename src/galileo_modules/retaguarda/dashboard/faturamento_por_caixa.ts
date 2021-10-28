import { situacoesNfe } from '../../../common/constants';
import { db } from '../../../common/ex_sql_relatorio';

export default async (req) => {
    const rows = await db(`select
    cx.id_caixa, 
    sum(P.VALOR) - sum(CASE WHEN p.FORMA_PAGAMENTO=1 then coalesce(v.VL_TROCO,0) ELSE 0 end) AS valor FROM TB_NFE v 
    inner join tb_nfe_pagamento p on v.serie = p.serie and p.numero = v.numero 
    inner join tb_forma_pagamento f on p.forma_pagamento=f.id 
    inner join tb_caixa_movimento cx on v.id_caixa_movimento=cx.id_caixa_movimento 
    where cx.dt_abt >= '${req.body.dataIni}' and cx.dt_abt <= '${req.body.dataFim}' and v.situacao ${situacoesNfe[req.body.situacaoNfe || 'TUDO']} and f.ativo ='S' and f.id <> 5
    group by cx.id_caixa`).execute(req.body.lojasId)

    const result = rows.reduce((acc, f) => {
        if (!acc[f.id_caixa]) acc[f.id_caixa] = 0;
        acc[f.id_caixa] += parseFloat(f.valor);
        return acc;
    }, {})

    return result;
}
