import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/reverter_quitacao', 'POST') }

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

        const rPin = await pgSql(`select pin from tb_pin where pin = md5('${req.body.pin}')`)

        if (rPin.length === 0) {
            res.json({
                ok: false,
                msg: 'PIN INCORRETO'
            })

            return
        }

        const ids = req.body.contas.map(c => c.id)

        await pgSql(`update tb_pagar set
            data_pagamento = NULL,
            id_carteira = 0,
            valor_pago = 0,
            status = 0
            where id in (${ids.join()})
        `)

        res.json({
            ok: true
        })
    }
}