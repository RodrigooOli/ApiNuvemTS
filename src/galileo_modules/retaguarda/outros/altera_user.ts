import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection()

export default new class extends RouterFn {
    constructor() { super('/retaguarda/altera_user', 'POST') }

    async fn(req: Request, res: Response) {
        if (req.body.alterarSenha) {
            const rSenha = await pgSql(`select id from tb_operadores where id = ${req.body.id} and senha = md5('${req.body.senhaatual}')`)

            if (!rSenha[0]) {
                res.json({
                    ok: false,
                    msg: 'Senha atual incorreta'
                })
                return;
            }
        }

        const sqlSenha = !!req.body.senha ? `, senha = '${req.body.senha}'` : ''

        await pgSql(`update tb_operadores set
            nome = '${req.body.nome}',
            login = '${req.body.login}'
            ${sqlSenha}
            where id = ${req.body.id}
        `)

        res.json({ ok: true })
    }
}