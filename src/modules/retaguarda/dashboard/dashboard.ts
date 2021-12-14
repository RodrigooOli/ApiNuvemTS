import { Request, Response } from "express-serve-static-core";
import { RouterFn } from "../../../models/router_model";
import { verificaContasRecorrente } from "../financeiro/contas_a_pagar/verifica_contas_recorrente";

export default new class extends RouterFn {
    constructor() {
        super('/retaguarda/dashboard', 'POST')
    }

    async fn(req: Request, res: Response): Promise<any> {
        const body = {
            totais: {
                entradas: 0,
                saidas: 0,
                saldo: 0,
                previsao: 0
            },
            centroDeCusto: [],
            contas: [],
            ranking: [],
            faturamentoPorDia: [],
            saldoPorDia: [],
            vendasPorFormaPagamento: [],
            faturamentoPorCaixa: [],
            faturamentoPorHora: [],
            faturamentoPorLoja: {},
        }

        if (req.body.lojasId && req.body.lojasId.length > 0) {
            for (let i = 0; i < req.body.lojasId.length; i++) {
                const idLoja = req.body.lojasId[i];

                await verificaContasRecorrente({
                    body: {
                        filtros: {
                            dataFim: req.body.dataFim
                        },
                        idLoja: idLoja
                    }
                } as Request)
            }

            const fnResult = (await import('./totais')).default;
            const fnContas = (await import('./contas')).default;
            const fnCentroDeCusto = (await import('./centro_de_custo')).default;
            const fnRanking = (await import('./ranking_de_vendas')).default;
            const fnFaturamentoPorDia = (await import('./faturamento_por_dia')).default;
            const fnSaldoPorDia = (await import('./saldo_por_dia')).default;
            const fnVendasPorFormaPagamento = (await import('./vendas_por_forma_pagamento')).default;
            const fnFaturamentoPorCaixa = (await import('./faturamento_por_caixa')).default;
            const fnFaturamentoPorHora = (await import('./faturamento_por_hora')).default;
            const fnFaturamentoPorLoja = (await import('./faturamento_por_loja')).default;

            const result = await fnResult(req)
            const contas = await fnContas(req)
            const centroDeCusto = await fnCentroDeCusto(req)
            const ranking = await fnRanking(req)
            const faturamentoPorDia = await fnFaturamentoPorDia(req)
            const saldoPorDia = await fnSaldoPorDia(req)
            const vendasPorFormaPagamento = await fnVendasPorFormaPagamento(req)
            const faturamentoPorCaixa = await fnFaturamentoPorCaixa(req)
            const faturamentoPorHora = await fnFaturamentoPorHora(req)
            const faturamentoPorLoja = await fnFaturamentoPorLoja(req)

            body.totais = result
            body.centroDeCusto = centroDeCusto;
            body.contas = contas.sort((a, b) => Date.parse(a['vencimento']) - Date.parse(b['vencimento']));
            body.ranking = ranking;
            body.faturamentoPorDia = faturamentoPorDia;
            body.saldoPorDia = saldoPorDia;
            body.vendasPorFormaPagamento = vendasPorFormaPagamento;
            body.faturamentoPorCaixa = faturamentoPorCaixa;
            body.faturamentoPorHora = faturamentoPorHora;
            body.faturamentoPorLoja = faturamentoPorLoja;
        }

        res.json({
            ok: true,
            body: body
        })
    }
}