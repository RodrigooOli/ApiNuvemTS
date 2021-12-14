import { Request } from "express";
import { ClientConfig } from "pg";
import { pgConnection } from "../../../../utils/pg_sql";
import { addMeses } from "../../../../utils/ultils";

export async function verificaContasRecorrente(req: Request) {
    const filtros = req.body.filtros;

    const options: ClientConfig = {
        user: 'postgres',
        password: 'avfarila@2021!',
        host: '191.252.220.143',
        database: `d${req.body.idLoja}`,
        port: 5432
    }

    const pgSql = pgConnection(options);

    const rows = await pgSql(`select tr.*
    from tb_recorrente tr
    where tr.tipo = 1 and tr.ultimo_mes_lancado < date_part('month', '${filtros.dataFim}'::date)
    and tr.ultimo_ano_lancado <= date_part('year', '${filtros.dataFim}'::date)`)

    for (let i = 0; i < rows.length; i++) {
        const conta = rows[i];

        const ultimoAno = conta['ultimo_ano_lancado'];
        const ultimoMes = conta['ultimo_mes_lancado'];
        const ultimaData = `${ultimoAno}-${ultimoMes}-01 `
        const dataFim = filtros.dataFim

        if (Date.parse(dataFim) > Date.parse(ultimaData)) {
            const ms = Date.parse(dataFim) - Date.parse(ultimaData)
            const meses = Math.floor(ms / 1000 / 60 / 60 / 24 / 31)
            const data = addMeses(`${ultimoAno}-${ultimoMes}-${conta['dia_venc']}`, 0)

            let [umaDasContas] = await pgSql(`select id_fornecedor from tb_pagar where id_vinculada = ${conta['id']} limit 1`)

            if (!umaDasContas) umaDasContas = {}

            let dataGravada = ''

            for (let i = 1; i <= meses; i++) {
                dataGravada = addMeses(data, i).toLocaleDateString().split('/').reverse().join('-')

                await pgSql(`insert into tb_pagar (
                    vencimento,
                    valor,
                    id_fornecedor,
                    id_grupo,
                    id_subgrupo,
                    descricao,
                    status,
                    tipo_conta,
                    id_vinculada
                ) values (
                    '${dataGravada}',
                    ${conta.valor},
                    ${umaDasContas['id_fornecedor'] || 0},
                    ${conta['id_grupo']},
                    ${conta['id_subgrupo']},
                    upper('${conta.descricao}'),
                    0,
                    1,
                    ${conta.id}
                )`)
            }

            await pgSql(`update tb_recorrente
            set ultimo_mes_lancado = ${dataGravada.split('-')[1]},
            ultimo_ano_lancado = ${dataGravada.split('-')[0]}
            where id = ${conta.id}`)
        }
    }
}