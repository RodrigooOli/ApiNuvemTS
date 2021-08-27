import { Request, Response } from "express-serve-static-core";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

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
        super('/retaguarda/relatorios/:relatorio', 'POST')
    }

    async fn(req: Request, res: Response): Promise<any> {
        if (!req.body.lojasId || req.body.lojasId.length === 0) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada!'
            })
            return;
        }

        const relatorio = (await import(__dirname + `\\..\\relatorios\\${req.params.relatorio}`)).default;
        const rows = await relatorio(req.body.lojasId, req.body.filtros);

        res.json({
            ok: true,
            body: rows
        })
    }
}