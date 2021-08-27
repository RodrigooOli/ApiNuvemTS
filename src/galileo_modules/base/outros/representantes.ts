import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";
const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/representantes', 'GET') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`select id, nome, cep, rua, bairro, cidade, estado, celular, data_cadastro, cpf_cnpj, interno from tb_representantes`);

        res.json({
            ok: true,
            body: rows
        })
    }
}