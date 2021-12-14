import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { aspasSimplesDB } from "../../../../utils/ultils";


export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_grupo', 'POST') }

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

        await pgSql(`update tb_grupo set
            grupo = upper('${aspasSimplesDB(req.body.grupo)}'),
            ativo = ${!!req.body.ativo ? 1 : 0}
            where idgrupo = '${req.body.idgrupo}'
        `)

        res.json({
            ok: true
        })
    }
}