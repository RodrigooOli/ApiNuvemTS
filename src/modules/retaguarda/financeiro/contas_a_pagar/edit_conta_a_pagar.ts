import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { aspasSimplesDB } from "../../../../utils/ultils";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_conta_a_pagar', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        if (!req.body.id) {
            res.json({
                ok: false,
                msg: 'Conta não foi identificada'
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

        await pgSql(`update tb_pagar set
            vencimento = ${req.body.vencimento ? `'${req.body.vencimento}'` : 'vencimento'},
            valor = ${req.body.valor ? req.body.valor : 'valor'},
            id_fornecedor = ${req.body.fornecedor ? req.body.fornecedor : 'id_fornecedor'},
            id_grupo = ${req.body.grupo ? req.body.grupo : 'id_grupo'},
            id_subgrupo = ${req.body.subgrupo ? req.body.subgrupo : 'id_subgrupo'},
            descricao = ${!!req.body.descricao ? `'${aspasSimplesDB(req.body.descricao)}'` : 'descricao'},
            boleto = ${req.body.boleto ? `'${req.body.boleto}'` : 'boleto'}
            where id = ${req.body.id}
        `)

        res.json({
            ok: true
        })
    }
}