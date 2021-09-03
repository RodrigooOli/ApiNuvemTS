import { Request, Response } from "express";
import { permissoesUsuario } from "../../../../common/utils";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql';

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_gestores', 'POST') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`select top.*,
        array_agg(tol.id_loja) lojas_id
        from tb_operadores top 
        left join tb_operadores_lojas tol 
        on tol.id_operador = top.id 
        where cod_empresa = ${req.body.cod} and (top.id <> ${req.body.id} and top.nivel <= ${req.body.nivel})
        group by top.id `);

        const gestores = rows.map(r => {
            const permissoes = permissoesUsuario(r);
            delete r.senha
            return {
                ...r,
                v_dashboard: r.nivel === 4 || permissoes.includes(-1),
                permissao: permissoes,
            };
        })

        res.json({
            ok: true,
            body: gestores
        })
    }
}