import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";
const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/base/list_import_suporte', 'GET') }

    async fn(req: Request, res: Response) {
        const rows = await pgSql(`select nome, suporte from tb_representantes`);

        res.json({
            ok: true,
            body: rows.map(r => ({
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
        })
    }
}