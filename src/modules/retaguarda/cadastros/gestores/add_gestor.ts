import { Request, Response } from "express";
import { permissoesUsuario } from "../../../../common/utils";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql';

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_gestor', 'POST') }

    async fn(req: Request, res: Response) {
        try {
            const rows = await pgSql(`insert into tb_operadores (
                nome,
                nivel,
                permissao,
                login,
                cod_empresa,
                senha,
                id_franquia
            ) values (
                '${req.body.nome}',
                ${req.body.nivel},
                '[${req.body.permissao.toString()}]',
                '${req.body.login}',
                ${req.body.codEmp},
                '${req.body.senha}',
                '${req.body.idFranquia}'
            ) returning *`);

            await req.body.lojas_id.forEach(async (id: string) => await pgSql(`insert into tb_operadores_lojas (id_loja, id_operador) values ('${id}', ${rows[0].id})`));

            res.json({
                ok: true,
                body: rows.map(r => {
                    delete r['senha'];
                    return { ...r, permissao: permissoesUsuario(r) }
                })[0]
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