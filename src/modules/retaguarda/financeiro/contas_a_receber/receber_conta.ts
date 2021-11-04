import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/receber_contas', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        if (!req.body.contas.length) {
            res.json({
                ok: false,
                msg: 'Nenhuma conta recebida'
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

        if (req.body.contas.length > 1) {
            const ids = req.body.contas.map(c => c.id)

            await pgSql(`update tb_receber set
                data_recebimento = '${req.body.dataRecebimento}',
                valor_recebido = valor,
                status = 1
                where id in (${ids.join()})
            `)
        } else {
            const conta = req.body.contas[0]

            await pgSql(`update tb_receber set
                data_recebimento = '${req.body.dataRecebimento}',
                valor_recebido = ${req.body.valorRecebido ? req.body.valorRecebido : 'valor'},
                status = 1
                where id = ${conta.id}
            `)
        }

        res.json({
            ok: true
        })
    }
}