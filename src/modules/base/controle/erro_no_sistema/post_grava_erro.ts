import { Request, Response } from "express";
import { RouterFn } from "../../../../models/router_model";
import { gravaErroSistema } from './funcao_grava_erro'

export default new class extends RouterFn {
    constructor() { super('/base/grava_erro_sistema', 'POST') }

    async fn(req: Request, res: Response) {
        if (!(req.body instanceof Array)) req.body = [req.body];
        let gravar = true;

        async function grava() {
            for (let i = 0; i < req.body.length; i++) {
                const body = req.body[i];
                const keys = ['msg', 'origem', 'dataErr']

                for (let i = 0; i < keys.length; i++) {
                    const k = keys[i];
                    if (!Object.keys(body).includes(k)) {
                        res.json({
                            ok: false,
                            err: 'Algum valor obrigatório não existe no obj!',
                            body: body,
                            keys: keys
                        })
                        gravar = false;
                        break;
                    }
                }

                if (!gravar) break;

                await gravaErroSistema({
                    dataErr: new Date(body.dataErr),
                    msg: body.msg,
                    origem: body.origem,
                    origem_d: body.origem_d,
                    ident: body.ident
                })
            }
        }

        await grava()

        if (!gravar) return;

        res.json({
            ok: true,
        })
    }
}