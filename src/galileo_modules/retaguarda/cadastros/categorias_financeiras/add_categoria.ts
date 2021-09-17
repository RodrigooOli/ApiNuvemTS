import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_grupo_fin', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        if (!['CRÉDITO', 'DÉBITO'].includes(req.body.tipo)) {
            res.json({
                ok: false,
                msg: 'Tipo da categoria é inválido'
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

        const rows = await pgSql(`insert into tb_grupofin (grupo, ativo, tipo) values ('${req.body.nome}', ${req.body.ativo ? 1 : 0}, upper('${req.body.tipo}')) returning *`)

        res.json({
            ok: true,
            body: rows[0]
        })
    }
}