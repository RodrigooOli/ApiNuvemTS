import { Request, Response } from "express-serve-static-core";
import { permissoesUsuario } from "../../../../common/utils";
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
        let user: IUser;
        let rLojas;

        const exSql = pgConnection(base);
        const ehRepresentante = req.body.user.split('.')[0] === 'galileo'
        // const codigoEmpresa = req.body.user.toUpperCase() === 'MASTER' && req.body.passw === '78453661' ? '0' : req.body.codigo

        var nome = req.body.user.split('.')[1]

        const rUser = ehRepresentante
            ? await exSql(`select to2.*
            from tb_operadores to2
            inner join tb_representantes tr 
            on upper(tr.nome) = upper('${nome}') and tr.senha = md5('${req.body.passw}')
            where tr.id = to2.representante
            `)
            : await exSql(`select * from tb_operadores where upper(login) = upper('${req.body.user}') and senha = md5('${req.body.passw}') and cod_empresa = ${req.body.codigo}`)

        if (rUser.length === 0) {
            res.json({
                ok: false,
                msg: 'Acesso Negado! Verifique usuário e senha'
            })
            return
        }

        user = {
            id_operador: rUser[0].id,
            id_franquia: rUser[0].id_franquia,
            ativo: rUser[0].ativo ? 1 : 0,
            nome: rUser[0].nome,
            login: rUser[0].login,
            cartao: rUser[0].cartao,
            nivel: rUser[0].nivel,
            cod_atd: rUser[0].cod_atd,
            v_dashboard: false,
            permissao: [],
            representante: rUser[0].representante
        }

        if (!user.ativo) {
            res.json({
                ok: false,
                msg: 'O usuário está desativado!'
            })
            return
        }

        const permissoes = permissoesUsuario(rUser[0])
        user.permissao = permissoes.filter(p => p !== 28 || user.nivel === 4)
        user.v_dashboard = user.nivel === 4 || permissoes.includes(-1)

        rLojas = await exSql(`select tl.* 
            from tb_lojas tl
            ${user.nivel !== 4
                ? `inner join tb_operadores_lojas tol 
                    on tol.id_loja = tl.id
                    and tol.id_operador = ${user.id_operador}`
                : ''
            }
            where cod_cliente = ${req.body.codigo}
            ${!!user.representante && rUser[0].cod_empresa !== 0 ? `and id_representante = ${user.representante}` : ''}`);

        if (rLojas.length === 0) {
            res.json({
                ok: false,
                msg: `O usuário não tem permissão para acessar nenhuma loja com o código ${req.body.codigo}`
            })
            return
        }


        const rRepresentante = await exSql(`select id, nome, suporte from tb_representantes where id = ${rLojas[0].id_representante}`)

        const representante = rRepresentante.map(r => ({
            ...r,
            suporte: {
                telefones: r.suporte.telefones || [],
                whatsapp: r.suporte.whatsapp || [],
                plantao: r.suporte.plantao || [],
                telefones_horario: r.suporte.telefones_horario || '',
                whatsapp_horario: r.suporte.whatsapp_horario || '',
                plantao_horario: r.suporte.plantao_horario || '',
            }
        }))

        res.json({
            ok: true,
            body: {
                user: user,
                lojas: rLojas,
                representante: representante,
            }
        })
    }
}