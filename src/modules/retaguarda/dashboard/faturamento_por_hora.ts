import { situacoesNfe } from '../../../common/constants';
import { db } from '../../../common/ex_sql_relatorio';

export default async (req) => {
    const rows = await db(`select 
    date_part('hour', tn.dthr_saida::timestamp) as hora,
    sum(tnp.valor) - sum(CASE WHEN tnp.forma_pagamento = 1 then coalesce(tn.vl_troco, 0) ELSE 0 end) AS vendas
    from tb_nfe tn 
    inner join tb_nfe_pagamento tnp 
    on tnp.serie = tn.serie and tnp.numero = tn.numero 
    inner join tb_forma_pagamento tfp 
    on tfp.id = tnp.forma_pagamento 
    inner join tb_caixa_movimento tcm 
    on tcm.id_caixa_movimento = tn.id_caixa_movimento 
    where tcm.data_abertura::date >= '${req.body.dataIni}' AND tcm.data_abertura::date <= '${req.body.dataFim}'
    and tn.situacao ${situacoesNfe[req.body.situacaoNfe || 'TUDO']}
    and tfp.ativo = 'S'
    group by date_part('hour', tn.dthr_saida::timestamp)`).execute(req.body.lojasId)


    const result = rows.reduce((acc, f) => {
        if (!Object.keys(acc).includes(f.hora.toString())) acc[f.hora.toString()] = 0;

        acc[f.hora.toString()] += +f.vendas
        return acc;
    }, {})

    return result;
}
