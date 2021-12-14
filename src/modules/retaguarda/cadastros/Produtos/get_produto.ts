import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'


export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_produto', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            console.log(req.body)
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

        const rows = await pgSql(`select * from tb_produto where id_produto = ${req.body.id}`)
        const rFornecedores = await pgSql(`select id_fornecedor from tb_produto_fornecedor where id_produto = ${req.body.id}`)

        res.json({
            ok: true,
            body: {
                ...rows[0],
                fornecedores: rFornecedores.map(f => f.id_fornecedor)
            }
        })
    }
}