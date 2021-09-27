import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/excluir_contas', 'POST') }

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

        if (req.body.deletarRecorrente && req.body.contas.length === 1 && req.body.contas[0].tipo_conta === 1) {
            await Promise.all([
                pgSql(`delete from tb_recorrente where id = ${req.body.contas[0].id_vinculada}`),
                pgSql(`delete from tb_pagar where status = 0 and id_vinculada = ${req.body.contas[0].id_vinculada}`),
            ])
        } else {
            const ids = req.body.contas.map(c => c.id)
            await pgSql(`delete from tb_pagar where status = 0 and id in (${ids.join()})`)
        }

        res.json({
            ok: true
        })
    }
}