import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import * as ftp from 'basic-ftp'

export default new class extends RouterFn {
    constructor() { super('/base/list_download/:arquivo', 'GET') }

    async fn(req: Request, res: Response) {
        const client = new ftp.Client();

        const icons = {
            'zip': 'folder',
            'exe': 'launch',
        }

        try {
            await client.access({
                host: 'ftp.lsiconsultoria.com.br',
                user: 'lsiconsultoria',
                password: 'lsic9283',
            })

            const rows = await client.list(`./downloadplus/${req.params.arquivo}`)

            client.close()

            res.json({
                ok: true,
                body: rows.filter(r => r.type === 1).map(r => ({
                    ...r,
                    url: `https://lsiconsultoria.com.br/downloadplus/${req.params.arquivo}/${r.name}`,
                    icon: icons[r.name.split('.')[1]] || 'folder'
                }))
            })
        } catch (e) {
            throw e;
        }
    }
}