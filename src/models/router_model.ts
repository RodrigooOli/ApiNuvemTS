import { Request, Response } from "express";
import { gravaErroSistema } from "../galileo_modules/base/controle/erro_no_sistema/funcao_grava_erro";

export class RouterFn {
    constructor(public route: string, public method: 'GET' | 'POST') { }

    protected async fn(req: Request, res: Response): Promise<void> { }

    execute = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.fn(req, res);
        } catch (e) {
            console.log(e)
            gravaErroSistema({
                dataErr: new Date(Date.now()),
                msg: `${e.toString()}, body: ${JSON.stringify(req.body)}`,
                ident: req.headers.host,
                origem: 'API NUVEM',
                origem_d: req.url,
            })
            res.json({
                ok: false,
                e: e.toString()
            })
        }
    }
}