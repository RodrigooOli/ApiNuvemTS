import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import * as ftp from 'basic-ftp'

export default new class extends RouterFn {
    constructor() { super('/base/list_download', 'GET') }

    async fn(req: Request, res: Response) {
        const client = new ftp.Client();

        try {
            await client.access({
                host: 'ftp.lsiconsultoria.com.br',
                user: 'lsiconsultoria',
                password: 'lsic9283',
            })

            const rows = await client.list('./downloadplus')

            res.json({
                ok: true,
                body: rows.filter(r => r.type === 2)
            })
        } catch (e) {
            throw e;
        } finally {
            client.close();
        }
    }
}