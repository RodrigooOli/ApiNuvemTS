import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { aspasSimplesDB, dateFormat, numbers, validEan13 } from "../../../../utils/ultils";


export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_produto', 'POST') }

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

        const rCodInterno = await pgSql(`select descricao from tb_produto where cod_interno = '${req.body.cod_interno}' and id_produto <> ${req.body.id_produto} limit 1`)

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


        await pgSql(`update tb_produto set
            ativo = '${!!req.body.ativo ? 'S' : 'N'}',
            cod_interno = '${req.body.cod_interno}',
            permite_fracionar = '${!!req.body.permite_fracionar ? 'S' : 'N'}',
            gtin = '${req.body.gtin}',
            descricao = '${aspasSimplesDB(req.body.descricao)}',
            und = '${req.body.und}',
            desc_reduzida = '${aspasSimplesDB(req.body.desc_reduzida)}',
            desc_lei14181 = '${aspasSimplesDB(req.body.desc_lei14181)}',
            pontos = ${numbers(req.body.pontos)},
            produto_acrescimo = ${!!req.body.produto_acrescimo ? 1 : 0},
            vl_custo = ${numbers(req.body.vl_custo)},
            margem = ${numbers(req.body.margem)},
            vl_unitario = ${numbers(req.body.vl_unitario)},
            vl_promocao = ${numbers(req.body.vl_promocao)},
            inicio_promocao = ${req.body.inicio_promocao ? `'${dateFormat(req.body.inicio_promocao, 'date')}'` : 'null'},
            fim_promocao = ${req.body.fim_promocao ? `'${dateFormat(req.body.fim_promocao, 'date')}'` : 'null'},
            vl_atacado = ${numbers(req.body.vl_atacado)},
            qtde_atacado = ${numbers(req.body.qtde_atacado)},
            idgrupo = ${req.body.idgrupo},
            idsubgrupo = ${req.body.idsubgrupo},
            ncm = '${numbers(req.body.ncm)}',
            extipi = '${req.body.extipi}',
            cfop = ${req.body.cfop},
            origem = ${req.body.origem || 0},
            cest = '${req.body.cest}',
            reducao_bc = ${req.body.reducao_bc || 0},
            lista_precos = ${req.body.lista_precos || 0},
            sn_aliqcredito = ${numbers(req.body.sn_aliqcredito)},
            liberado = ${req.body.liberado ? `'${dateFormat(req.body.liberado, 'date')}'` : 'null'},
            estoque_minimo = ${numbers(req.body.estoque_minimo)},
            cst = '${req.body.cst}',
            id_cstipi = '${req.body.cstipi}',
            id_cstpis = '${req.body.cstpis}',
            id_cstcofins = '${req.body.cstcofins}',
            icms_aliquota = ${numbers(req.body.icms_aliquota)},
            ipi_aliquota = ${numbers(req.body.ipi_aliquota)},
            pis_aliquota = ${numbers(req.body.pis_aliquota)},
            cofins_aliquota = ${numbers(req.body.cofins_aliquota)},
            exporta_balanca = ${!!req.body.exporta_balanca ? 1 : 0},
            cod_balanca = ${numbers(req.body.cod_balanca)},
            dias_validade = ${numbers(req.body.dias_validade)},
            descricao_lote = '${req.body.descricao_lote}',
            imp_embalagem = ${!!req.body.imp_embalagem ? 1 : 0},
            imp_validade = ${!!req.body.imp_validade ? 1 : 0},
            id_setor = ${req.body.id_setor || 0},
            id_tara = ${req.body.id_tara || 0},
            qtd_porcao = ${numbers(req.body.qtd_porcao)},
            tipo_porcao = ${numbers(req.body.tipo_porcao)},
            qtd_tipo_porcao = ${numbers(req.body.qtd_tipo_porcao)},
            descricao_porcao = ${numbers(req.body.descricao_porcao)},
            valor_energetico = ${numbers(req.body.valor_energetico)},
            carboidratos = ${numbers(req.body.carboidratos)},
            proteinas = ${numbers(req.body.proteinas)},
            gorduras_totais = ${numbers(req.body.gorduras_totais)},
            gorduras_saturadas = ${numbers(req.body.gorduras_saturadas)},
            gorduras_trans = ${numbers(req.body.gorduras_trans)},
            fibra_alimentar = ${numbers(req.body.fibra_alimentar)},
            sodio = ${numbers(req.body.sodio)},
            alinhamento = ${req.body.alinhamento || 0},
            linha1 = '${aspasSimplesDB(req.body.linha1)}',
            linha2 = '${aspasSimplesDB(req.body.linha2)}',
            linha3 = '${aspasSimplesDB(req.body.linha3)}',
            linha4 = '${aspasSimplesDB(req.body.linha4)}',
            linha5 = '${aspasSimplesDB(req.body.linha5)}',
            linha6 = '${aspasSimplesDB(req.body.linha6)}',
            linha7 = '${aspasSimplesDB(req.body.linha7)}',
            linha8 = '${aspasSimplesDB(req.body.linha8)}',
            vender_domingo = ${!!req.body.vender_domingo ? 1 : 0},
            vender_segunda = ${!!req.body.vender_segunda ? 1 : 0},
            vender_terca = ${!!req.body.vender_terca ? 1 : 0},
            vender_quarta = ${!!req.body.vender_quarta ? 1 : 0},
            vender_quinta = ${!!req.body.vender_quinta ? 1 : 0},
            vender_sexta = ${!!req.body.vender_sexta ? 1 : 0},
            vender_sabado = ${!!req.body.vender_sabado ? 1 : 0},
            vender_caixa = ${!!req.body.vender_caixa ? 1 : 0},
            csosn = '${req.body.csosn}',
            vl_ifood = ${numbers(req.body.vl_ifood)},
            desc_ifood = '${aspasSimplesDB(req.body.desc_ifood)}'
            where id_produto = ${req.body.id_produto}
        `)

        await pgSql(`delete from tb_produto_fornecedor where id_produto = ${req.body.id_produto}`)

        for (let i = 0; i < req.body.fornecedores.length; i++) {
            const id = req.body.fornecedores[i];
            await pgSql(`insert into tb_produto_fornecedor (id_produto, id_fornecedor) values (${req.body.id_produto}, ${id})`)
        }

        res.json({
            ok: true
        })
    }
}