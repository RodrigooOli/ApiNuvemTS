import { Request, Response } from "express";
import { RouterFn } from "../../../../models/router_model";
import { criaEan13 } from "../../../../utils/ultils";


export default new class extends RouterFn {
    constructor() { super('/retaguarda/gtin_valido', 'POST') }

    async fn(req: Request, res: Response) {
        req.body.gtin = +(req.body.gtin.toString().replace(/\D/g, ''))

        let gtin = criaEan13(req.body.gtin)

        res.json({
            ok: true,
            body: gtin
        })
    }
}