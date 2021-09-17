import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_carteira', 'POST') }

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

        const rows = await pgSql(`insert into tb_carteira (
            nome,
            agencia,
            conta,
            digito,
            ativo,
            id_banco,
            carteira,
            digagencia,
            convenio
        ) values (
            upper('${req.body.nome}'), 
            '${req.body.agencia}',
            '${req.body.conta}',
            '${req.body.digito}',
            ${req.body.ativo ? 1 : 0},
            ${req.body.id_banco},
            '${req.body.carteira}',
            '${req.body.digagencia}',
            '${req.body.convenio}'
        ) returning *`)

        res.json({
            ok: true,
            body: rows[0]
        })
    }
}