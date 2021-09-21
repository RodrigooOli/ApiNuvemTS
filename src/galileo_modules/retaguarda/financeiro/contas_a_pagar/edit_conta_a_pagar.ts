import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_carteira', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        if (!req.body.id) {
            res.json({
                ok: false,
                msg: 'Cateira não foi identificada'
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

        await pgSql(`update tb_carteira set
            nome = '${req.body.nome}',
            agencia = '${req.body.agencia}',
            conta = '${req.body.conta}',
            digito = '${req.body.digito}',
            ativo = ${req.body.ativo ? 1 : 0},
            id_banco = ${req.body.id_banco},
            carteira = '${req.body.carteira}',
            digagencia = '${req.body.digagencia}',
            convenio = '${req.body.convenio}'
            where id_carteira = ${req.body.id}
        `)

        res.json({
            ok: true
        })
    }
}