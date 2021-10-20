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
    constructor() { super('/retaguarda/add_conta_a_receber', 'POST') }

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

        if (req.body.tipo === 'PARCELADO') {
            contasGravar[0].descricao = `${contasGravar[0].descricao} 1/${req.body.qtdParcelas}`
            req.body.recebida = false;

            for (let i = 1; i < req.body.qtdParcelas; i++) {
                const dataVencimento = addMeses(`${req.body.vencimento} `, i)

                contasGravar.push({
                    ...req.body,
                    descricao: `${req.body.descricao} ${i + 1}/${req.body.qtdParcelas}`,
                    vencimento: dataVencimento.toLocaleDateString('pt-br').split('/').reverse().join('-')
                })
            }
        }

        for (let i = 0; i < contasGravar.length; i++) {
            const conta = contasGravar[i];

            const rows = await pgSql(`insert into tb_receber (
                vencimento,
                valor,
                id_cliente,
                id_grupo,
                id_subgrupo,
                descricao,
                status,
                tipo_conta,
                data_recebimento,
                valor_recebido
            ) values (
                '${conta.vencimento}',
                ${conta.valor},
                ${conta.cliente || 0},
                ${conta.grupo},
                ${conta.subgrupo},
                upper('${aspasSimplesDB(conta.descricao)}'),
                ${conta.recebida ? 1 : 0},
                ${TIPO_LANCAMENTO[conta.tipo]},
                ${conta.recebida ? `'${conta.dataRecebimento}'` : 'NULL'},
                ${conta.recebida ? conta.valor : 0}
            ) returning *`)

            contasGravada.push(rows[0]);
        }

        res.json({
            ok: true,
            body: contasGravada
        })
    }
}

