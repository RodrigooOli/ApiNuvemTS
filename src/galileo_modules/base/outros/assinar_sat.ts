import { cnpj } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/assinar_sat', 'POST') }

    async fn(req: Request, res: Response) {
        var id = '0';

        try {
            if (!!req.body.cnpj) {
                console.log(req.body.cnpj)
                if (!cnpj.isValid(req.body.cnpj)) {
                    res.json({
                        ok: false,
                        msg: 'CNPJ inválido'
                    })
                    return
                }

                const rows = await pgSql(`insert into tb_lojas (assinar_sat, cpf_cnpj, id_representante, nome) values (true, '${req.body.cnpj}', 15, 'Gerando chave SAT') returning id`);
                id = rows[0]['id']
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
                    if (id !== '0') {
                        pgSql(`delete from tb_lojas where id = '${id}'`);
                    }
                }, 10000)

                client.on("notification", (a) => {
                    res.json({
                        ok: a.payload.length === 344,
                        msg: a.payload
                    })
                    clearTimeout(timeout)
                    client.query("UNLISTEN assinatura");
                    if (id !== '0') {
                        pgSql(`delete from tb_lojas where id = '${id}'`);
                    }
                });
            });
        } catch (e) {
            if (e.toString() === 'error: duplicate key value violates unique constraint "cnpj_unique"') {
                res.json({
                    ok: false,
                    msg: 'Já existe um cliente com esse CNPJ no Galileo Plus, para gerar a chave é necessário ir ao cadastro de lojas do representante responsável'
                })
            } else {
                throw e;
            }
        }
    }
}