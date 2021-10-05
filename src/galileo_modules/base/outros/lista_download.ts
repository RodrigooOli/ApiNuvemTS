// import { Request, Response } from "express";
// import { RouterFn } from "../../../models/router_model";
// import * as ftp from 'basic-ftp'

// export default new class extends RouterFn {
//     constructor() { super('/base/list_download', 'GET') }

//     async fn(req: Request, res: Response) {

//         // const client = new ftp.Client();
//         // await client.access({
//         //     host: 'ftp.sistemagalileo.com.br',
//         //     user: 'sistemagalileo1',
//         //     password: 'avfarila@2021!',
//         // })

//         // const rows = client.list('./downloads')

//         res.json({
//             ok: true,
//             body: []
//         })
//     }
// }