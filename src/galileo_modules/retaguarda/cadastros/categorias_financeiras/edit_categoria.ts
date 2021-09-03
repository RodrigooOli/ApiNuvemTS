import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_grupo_fin', 'POST') }

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

        if (!req.body.id) {
            res.json({
                ok: false,
                msg: 'Categoria não foi identificada'
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

        await pgSql(`update tb_grupofin set
            grupo = coalesce('${req.body.nome}', grupo),
            ativo = coalesce(${req.body.ativo ? 1 : 0}, ativo),
            tipo = coalesce('${req.body.tipo}', tipo)
            where idgrupo = ${req.body.id}
        `)

        res.json({
            ok: true
        })
    }
}