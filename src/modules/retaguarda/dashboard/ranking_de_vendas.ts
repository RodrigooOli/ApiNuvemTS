import { situacoesNfe } from '../../../common/constants';
import { db } from '../../../common/ex_sql_relatorio';

export default async (req) => {
    const rows = await db(`select i.descricao, sum(i.quantidade) qntd, sum(i.vl_total) as vl_total
    from tb_nfe v 
    inner join tb_nfe_item i on v.serie = i.serie and v.numero = i.numero
    inner join tb_caixa_movimento c on v.id_caixa_movimento = c.id_caixa_movimento 
    inner join tb_nfe_pagamento p on i.serie=p.serie and i.numero=p.numero 
    inner join tb_forma_pagamento f on p.forma_pagamento=f.id 
    where c.data_abertura::date >= '${req.body.dataIni}'
    AND c.data_abertura::date <= '${req.body.dataFim}'
    and v.situacao ${situacoesNfe[req.body.situacaoNfe || 'TUDO']} and f.ativo ='S'
    group by i.descricao
    order by vl_total desc limit 10`).execute(req.body.lojasId)

    const ranking = rows.reduce((acc, r) => {
        const ind = acc.findIndex(row => row.descricao === r.descricao);

        if (ind !== -1) {
            acc[ind].vl_total += +r.vl_total
            acc[ind].qntd += +r.qntd
        } else {
            acc.push({
                ...r,
                vl_total: +r.vl_total,
                qntd: +r.qntd,
            })
        }

        return acc;
    }, [])

    return ranking;
}