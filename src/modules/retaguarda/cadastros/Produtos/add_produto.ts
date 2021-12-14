import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { aspasSimplesDB, dateFormat, numbers, validEan13 } from "../../../../utils/ultils";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_produto', 'POST') }

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

        if (!!req.body.gtin && !validEan13(req.body.gtin)) {
            res.json({
                ok: false,
                msg: 'Cód. de barras inválido'
            })
            return;
        }

        const rNcm = await pgSql(`select 1 from tb_ncm where codigo = '${req.body.ncm}'`)

        if (!rNcm.length) {
            res.json({
                ok: false,
                msg: 'NCM inválido'
            })
            return;
        }

        const rCodInterno = await pgSql(`select descricao from tb_produto where cod_interno = '${req.body.cod_interno}' limit 1`)

        if (!!rCodInterno.length) {
            res.json({
                ok: false,
                msg: `Código interno já está sendo últilizado por ${rCodInterno[0]['descricao']}`
            })
            return;
        }

        if (!!req.body.gtin) {
            const rGtin = await pgSql(`select descricao from tb_produto where gtin = '${req.body.gtin}' and id_produto <> ${req.body.id_produto}`)

            if (!!rGtin.length) {
                res.json({
                    ok: false,
                    msg: `Código de barras já está sendo últilizado por ${rGtin[0]['descricao']}`
                })
                return;
            }
        }
        const rProduto = await pgSql(`insert into tb_produto (
            ativo,
            cod_interno,
            permite_fracionar,
            gtin,
            descricao,
            und,
            desc_reduzida,
            desc_lei14181,
            pontos,
            produto_acrescimo,
            vl_custo,
            margem,
            vl_unitario,
            vl_promocao,
            inicio_promocao,
            fim_promocao,
            vl_atacado,
            qtde_atacado,
            idgrupo,
            idsubgrupo,
            ncm,
            extipi,
            cfop,
            origem,
            cest,
            reducao_bc,
            lista_precos,
            sn_aliqcredito,
            liberado,
            estoque_minimo,
            cst,
            id_cstipi,
            id_cstpis,
            id_cstcofins,
            icms_aliquota,
            ipi_aliquota,
            pis_aliquota,
            cofins_aliquota,
            exporta_balanca,
            cod_balanca,
            dias_validade,
            descricao_lote,
            imp_embalagem,
            imp_validade,
            id_setor,
            id_tara,
            qtd_porcao,
            tipo_porcao,
            qtd_tipo_porcao,
            descricao_porcao,
            valor_energetico,
            carboidratos,
            proteinas,
            gorduras_totais,
            gorduras_saturadas,
            gorduras_trans,
            fibra_alimentar,
            sodio,
            alinhamento,
            linha1,
            linha2,
            linha3,
            linha4,
            linha5,
            linha6,
            linha7,
            linha8,
            vender_domingo,
            vender_segunda,
            vender_terca,
            vender_quarta,
            vender_quinta,
            vender_sexta,
            vender_sabado,
            vender_caixa,
            csosn,
            vl_ifood,
            desc_ifood
        ) values (
            '${!!req.body.ativo ? 'S' : 'N'}',
            '${req.body.cod_interno}',
            '${!!req.body.permite_fracionar ? 'S' : 'N'}',
            '${req.body.gtin}',
            '${aspasSimplesDB(req.body.descricao)}',
            '${req.body.und}',
            '${aspasSimplesDB(req.body.desc_reduzida)}',
            '${aspasSimplesDB(req.body.desc_lei14181)}',
            ${numbers(req.body.pontos)},
            ${!!req.body.produto_acrescimo ? 1 : 0},
            ${numbers(req.body.vl_custo)},
            ${numbers(req.body.margem)},
            ${numbers(req.body.vl_unitario)},
            ${numbers(req.body.vl_promocao)},
            ${req.body.inicio_promocao ? `'${dateFormat(req.body.inicio_promocao, 'date')}'` : 'null'},
            ${req.body.fim_promocao ? `'${dateFormat(req.body.fim_promocao, 'date')}'` : 'null'},
            ${numbers(req.body.vl_atacado)},
            ${numbers(req.body.qtde_atacado)},
            ${req.body.idgrupo},
            ${req.body.idsubgrupo},
            '${numbers(req.body.ncm)}',
            '${req.body.extipi}',
            ${req.body.cfop},
            ${req.body.origem || 0},
            '${req.body.cest}',
            ${req.body.reducao_bc || 0},
            ${req.body.lista_precos || 0},
            ${numbers(req.body.sn_aliqcredito)},
            '${dateFormat(req.body.liberado, 'date')}',
            ${numbers(req.body.estoque_minimo)},
            '${req.body.cst}',
            '${req.body.cstipi}',
            '${req.body.cstpis}',
            '${req.body.cstcofins}',
            ${numbers(req.body.icms_aliquota)},
            ${numbers(req.body.ipi_aliquota)},
            ${numbers(req.body.pis_aliquota)},
            ${numbers(req.body.cofins_aliquota)},
            ${!!req.body.exporta_balanca ? 1 : 0},
            ${numbers(req.body.cod_balanca)},
            ${numbers(req.body.dias_validade)},
            '${req.body.descricao_lote}',
            ${!!req.body.imp_embalagem ? 1 : 0},
            ${!!req.body.imp_validade ? 1 : 0},
            ${req.body.id_setor || 0},
            ${req.body.id_tara || 0},
            ${numbers(req.body.qtd_porcao)},
            ${numbers(req.body.tipo_porcao)},
            ${numbers(req.body.qtd_tipo_porcao)},
            ${numbers(req.body.descricao_porcao)},
            ${numbers(req.body.valor_energetico)},
            ${numbers(req.body.carboidratos)},
            ${numbers(req.body.proteinas)},
            ${numbers(req.body.gorduras_totais)},
            ${numbers(req.body.gorduras_saturadas)},
            ${numbers(req.body.gorduras_trans)},
            ${numbers(req.body.fibra_alimentar)},
            ${numbers(req.body.sodio)},
            ${req.body.alinhamento || 0},
            '${aspasSimplesDB(req.body.linha1)}',
            '${aspasSimplesDB(req.body.linha2)}',
            '${aspasSimplesDB(req.body.linha3)}',
            '${aspasSimplesDB(req.body.linha4)}',
            '${aspasSimplesDB(req.body.linha5)}',
            '${aspasSimplesDB(req.body.linha6)}',
            '${aspasSimplesDB(req.body.linha7)}',
            '${aspasSimplesDB(req.body.linha8)}',
            ${!!req.body.vender_domingo ? 1 : 0},
            ${!!req.body.vender_segunda ? 1 : 0},
            ${!!req.body.vender_terca ? 1 : 0},
            ${!!req.body.vender_quarta ? 1 : 0},
            ${!!req.body.vender_quinta ? 1 : 0},
            ${!!req.body.vender_sexta ? 1 : 0},
            ${!!req.body.vender_sabado ? 1 : 0},
            ${!!req.body.vender_caixa ? 1 : 0},
            '${req.body.csosn}',
            ${numbers(req.body.vl_ifood)},
            '${aspasSimplesDB(req.body.desc_ifood)}'
        ) returning id_produto`)

        if (!!rProduto[0]) {
            for (let i = 0; i < req.body.fornecedores.length; i++) {
                const id = req.body.fornecedores[i];
                await pgSql(`insert into tb_produto_fornecedor (id_produto, id_fornecedor) values (${rProduto[0]['id_produto']}, ${id})`)
            }
        }

        res.json({
            ok: true,
        })
    }
}