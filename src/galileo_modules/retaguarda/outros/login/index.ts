import { Request, Response } from "express-serve-static-core";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from "../../../../utils/pg_sql";
import { IUser } from "./interfaces";

const base = {
    user: 'postgres',
    password: 'avfarila@2021!',
    host: '191.252.220.143',
    database: 'base',
    port: 5432
}

function conn(id) {
    return {
        user: 'postgres',
        password: 'avfarila@2021!',
        host: '191.252.220.143',
        database: `d${id}`,
        port: 5432
    }
}

export default new class extends RouterFn {
    constructor() {
        super('/retaguarda/login', 'POST')
    }

    async fn(req: Request, res: Response): Promise<any> {
        const exSql = pgConnection(base);
        let user: IUser; 

        const rUser = await exSql(`select * from tb_operadores where upper(login) = upper('${req.body.user}') and senha = md5('${req.body.passw}') and codigo = ${req.body.codigo}`)

        if (rUser.length === 0) {
            res.json({
                ok: false,
                msg: 'Acesso Negado! Verifique usuário e senha'
            })
            return
        }

        function permissoes() {
            try {
                const p = JSON.parse(rUser[0].permissao)
                return p;
            } catch (e) {
                return []
            }
        }

        user = {
            id_operador: rUser[0].id,
            ativo: rUser[0].ativo ? 1 : 0,
            nome: rUser[0].nome,
            cartao: rUser[0].cartao,
            nivel: rUser[0].nivel,
            cod_atd: rUser[0].cod_atd,
            permissao: permissoes()
        }

        const rLojas = await exSql(`select tl.* 
        from tb_lojas tl
        inner join tb_operadores_lojas tol 
        on tol.id_loja = tl.id 
        where cod_cliente = ${req.body.codigo}`);

        if (rLojas.length === 0) {
            res.json({
                ok: false,
                msg: `O usuário não tem permissão para acessar nenhuma loja com o código ${req.body.codigo}`
            })
            return
        }

        res.json({
            ok: true,
            body: {
                user: user,
                lojas: rLojas
            }
        })
    }
}