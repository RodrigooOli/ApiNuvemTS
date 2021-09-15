import { Request, Response } from "express-serve-static-core";
import { RouterFn } from "../../../models/router_model";

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

        const relatorio = (await import(__dirname + `/../relatorios/${req.params.relatorio}`)).default;
        const rows = await relatorio(req.body.lojasId, req.body.filtros);

        res.json({
            ok: true,
            body: rows
        })
    }
}