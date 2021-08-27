import { db } from '../../../common/ex_sql_relatorio';

export default async (req) => {
    const rContasAPagar = await db(`select tl.nome, x.* from dblink('host=191.252.220.143 user=postgres password=avfarila@2021! dbname=d$idLoja', '
            select * from (
                select id, descricao, valor, vencimento
                    from tb_pagar tp
                    where STATUS = 0 AND VENCIMENTO >= ''${req.body.dataIni}'' AND VENCIMENTO <= ''${req.body.dataFim}'' union
                select 0 as id, ''TOTAL'' as descricao, sum(valor) as valor, ''4000-12-31'' as vencimento
                    from tb_pagar tp
                    where STATUS = 0 AND VENCIMENTO >= ''${req.body.dataIni}'' AND VENCIMENTO <= ''${req.body.dataFim}''
                ) contas order by vencimento
            ') as x(id int, descricao text, valor text, vencimento date), tb_lojas tl where tl.id = '$idLoja'`).execute(req.body.lojasId, true)

    return rContasAPagar.reduce((acc, conta) => {
        if (conta.id === 0) {
            acc[0].valor += parseFloat(conta.valor || '0');
        } else {
            acc.push({
                ...conta,
                valor: parseFloat(conta.valor || '0')
            })
        }
        return acc;
    }, [{
        id: 0,
        nome: 'Total',
        descricao: 'Valor total',
        valor: 0,
        vencimento: '',
    }])
}