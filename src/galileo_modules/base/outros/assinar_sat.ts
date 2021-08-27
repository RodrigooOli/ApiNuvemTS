import { cnpj } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/assinar_sat', 'POST') }

    async fn(req: Request, res: Response) {
        if (!!req.body.cnpj) {
            console.log(req.body.cnpj)
            if (!cnpj.isValid(req.body.cnpj)) {
                res.json({
                    ok: false,
                    msg: 'CNPJ INFORMADO NÃO É UM DOCUMENTO VÁLIDO'
                })
                return
            }

            await pgSql(`update tb_lojas set assinar_sat = true, cpf_cnpj = ${req.body.cnpj} where id = 'dump'`);
        } else {
            await pgSql(`update tb_lojas set assinar_sat = true where id = '${req.body.id}'`);
        }

        const Client = require('pg').Client
        const httpClient = new Client({
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: 'base',
            port: 5432
        })


        httpClient.connect(function (err, client) {
            client.query("LISTEN assinatura");

            const timeout = setTimeout(() => {
                res.json({
                    ok: false,
                    msg: 'Não foi possível estabelecer conexão com o servidor!'
                })
                clearTimeout(timeout)
                client.query("UNLISTEN assinatura");
                pgSql(`update tb_lojas set assinar_sat = false, cpf_cnpj = '' where id = 'dump'`);
            }, 10000)

            client.on("notification", (a) => {
                res.json({
                    ok: a.payload.length === 344,
                    msg: a.payload
                })
                clearTimeout(timeout)
                client.query("UNLISTEN assinatura");
                pgSql(`update tb_lojas set assinar_sat = false, cpf_cnpj = '' where id = 'dump'`);
            });
        });
    }
}