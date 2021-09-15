import { cnpj, cpf } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/novo_representante', 'POST') }

    async fn(req: Request, res: Response) {
        if (!cpf.isValid(req.body.doc) && !cnpj.isValid(req.body.doc)) {
            res.json({
                ok: false,
                msg: 'CPF OU CNPJ NÃO É VÁLIDO'
            })
            return;
        }

        const rows = await pgSql(`insert into tb_representantes(nome, celular, cpf_cnpj, ativo, supervisor, wpp_suporte) values ('${req.body.nome}', '${req.body.celular}', '${req.body.doc}', ${!!req.body.ativo}, ${!!req.body.supervisor}, '${req.body.wppSuporte}') returning *`);

        res.json({
            ok: true,
            body: rows[0]
        })
    }
}