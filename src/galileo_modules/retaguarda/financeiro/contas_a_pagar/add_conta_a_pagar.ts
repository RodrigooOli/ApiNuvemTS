import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { addMeses, aspasSimplesDB } from "../../../../utils/ultils";

enum TIPO_LANCAMENTO {
    'NORMAL',
    'RECORRENTE',
    'PARCELADO',
}

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_conta_a_pagar', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        const options: ClientConfig = {
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: `d${req.body.idLoja}`,
            port: 5432
        }

        const pgSql = pgConnection(options)

        const contasGravar = [{ ...req.body }];
        const contasGravada = [];
        let id_vinculada = 0;

        if (req.body.tipo === 'PARCELADO') {
            contasGravar[0].descricao = `${contasGravar[0].descricao} 1/${req.body.qtdParcelas}`
            req.body.paga = false;

            for (let i = 1; i < req.body.qtdParcelas; i++) {
                const dataVencimento = addMeses(`${req.body.vencimento} `, i)

                contasGravar.push({
                    ...req.body,
                    descricao: `${req.body.descricao} ${i + 1}/${req.body.qtdParcelas}`,
                    vencimento: dataVencimento.toLocaleDateString('pt-br').split('/').reverse().join('-')
                })
            }
        }

        if (req.body.tipo === "RECORRENTE") {
            const conta = {
                ...contasGravar[0],
                vencimento: new Date(`${contasGravar[0].vencimento} `),
            };

            const rRecorrente = await pgSql(`insert into tb_recorrente (
                dia_venc,
                valor,
                id_cliente,
                id_grupo,
                id_subgrupo,
                descricao,
                ultimo_mes_lancado,
                ultimo_ano_lancado,
                tipo
            ) values (
                ${conta.vencimento.getDate()},
                ${conta.valor},
                0,
                ${conta.grupo},
                ${conta.subgrupo},
                '${conta.descricao}',
                ${conta.vencimento.getMonth() + 1},
                ${conta.vencimento.getFullYear()},
                1
            ) returning id`)

            id_vinculada = rRecorrente[0]['id']
        }

        for (let i = 0; i < contasGravar.length; i++) {
            const conta = contasGravar[i];

            const rows = await pgSql(`insert into tb_pagar (
                vencimento,
                valor,
                id_fornecedor,
                id_grupo,
                id_subgrupo,
                descricao,
                status,
                tipo_conta,
                id_vinculada,
                data_pagamento,
                id_carteira,
                valor_pago
            ) values (
                '${conta.vencimento}',
                ${conta.valor},
                ${conta.fornecedor || 0},
                ${conta.grupo},
                ${conta.subgrupo},
                upper('${aspasSimplesDB(conta.descricao)}'),
                ${conta.paga ? 1 : 0},
                ${TIPO_LANCAMENTO[conta.tipo]},
                ${id_vinculada},
                ${conta.paga ? `'${conta.dataPagamento}'` : 'NULL'},
                ${conta.carteira},
                ${conta.paga ? conta.valor : 0}
            ) returning *`)

            contasGravada.push(rows[0]);
        }

        res.json({
            ok: true,
            body: contasGravada
        })
    }
}

