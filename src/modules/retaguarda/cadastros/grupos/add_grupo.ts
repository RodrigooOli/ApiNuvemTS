import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { aspasSimplesDB } from "../../../../utils/ultils";

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_grupo', 'POST') }

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

        const rGrupo = await pgSql(`insert into tb_grupo (
            grupo,
            ativo
        ) values (
            upper('${aspasSimplesDB(req.body.grupo)}'),
            ${!!req.body.ativo ? 1 : 0}
        ) returning idgrupo`)

        if (!!rGrupo.length)
            await pgSql(`insert into tb_subgrupo (
            idgrupo,
            subgrupo,
            ativo
        ) values (
            ${rGrupo[0]['idgrupo']},
            upper('${aspasSimplesDB(req.body.grupo)}'),
            ${!!req.body.ativo ? 1 : 0}
        )`)

        res.json({
            ok: true,
        })
    }
}