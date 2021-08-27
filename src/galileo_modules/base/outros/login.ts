import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/login', 'POST') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`select id, nome, cep, rua, bairro, cidade, estado, celular, data_cadastro, cpf_cnpj, interno
        from tb_representantes where upper(nome) = upper('${req.body.user}') and senha = md5('${req.body.passw}')`);

        if (rows.length === 0) {
            res.json({
                ok: false,
                msg: 'Nome de usuário ou senha incorreta!'
            })
            return
        }

        res.json({
            ok: true,
            body: rows[0]
        })
    }
}