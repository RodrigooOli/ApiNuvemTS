import { Request, Response } from "express";
import { permissoesUsuario } from "../../../../common/utils";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql';

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/retaguarda/edit_gestor', 'POST') }

    async fn(req: Request, res: Response) {
        try {
            await pgSql(`
            update tb_operadores set
                nome = '${req.body.nome}',
                nivel = ${req.body.nivel},
                permissao = '[${req.body.permissao.toString()}]',
                login = '${req.body.login}',
                ativo = ${req.body.ativo}
                ${req.body.senha ? `, senha = ${req.body.senha}` : ''}
            where id = ${req.body.id}
            `);

            await pgSql(`delete from tb_operadores_lojas where id_operador = ${req.body.id}`)

            console.log(req.body.lojas_id)

            await req.body.lojas_id.forEach(async (id: string) => await pgSql(`insert into tb_operadores_lojas (id_loja, id_operador) values ('${id}', ${req.body.id})`));


            res.json({
                ok: true,
            })
        } catch (e) {
            if (e.constraint === 'tb_operadores_un') {
                res.json({
                    ok: false,
                    msg: 'Já existe um usuário com esse login!'
                })
                return
            }

            throw e;
        }
    }
}