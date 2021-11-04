import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from '../../../utils/pg_sql'

const pgSql = pgConnection()

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_lista_operadores', 'POST') }

    async fn(req: Request, res: Response) {
        const user = req.body.user
        const rows = await pgSql(`select * from tb_operadores where cod_empresa = ${user.codemp} and (${user.nivel} = 4 or nivel < ${user.nivel})`)

        const operadores = rows.map((op) => {
            function permissoes() {
                try {
                    const p = JSON.parse(op.permissao)
                    return p;
                } catch (e) {
                    return []
                }
            }

            delete op.senha;
            return {
                ...op,
                permissao: permissoes()
            };
        })

        res.json({
            ok: true,
            body: operadores,
        })
    }
}