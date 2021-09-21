import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/alterar_senha', 'POST') }

    async fn(req: Request, res: Response) {
        const valid = await pgSql(`select senha from tb_representantes where id = ${req.body.id} and senha = md5('${req.body.senhaAtual}')`)
        console.log(valid)

        if (!valid[0]) {
            res.json({
                ok: false,
                msg: 'Senha atual incorreta'
            })
            return
        }

        await pgSql(`update tb_representantes set senha = '${req.body.senha}' where id = ${req.body.id}`);

        res.json({
            ok: true,
        })
    }
}