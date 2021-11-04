import { Request, Response } from 'express'
import { RouterFn } from '../../../models/router_model'
import { db } from '../../../common/ex_sql_relatorio'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_lista_tabela', 'POST') }

    async fn(req: Request, res: Response) {
        const select = {
            clientes: '*',
        }

        const table = {
            clientes: 'tb_cliente',
        }

        const rows = await db(`select ${select[req.body.tabela]} from ${table[req.body.tabela]}`).execute(req.body.lojasId);

        res.json({
            ok: true,
            body: rows,
        })
    }
}