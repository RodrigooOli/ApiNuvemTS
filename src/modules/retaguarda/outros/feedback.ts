import { Request, Response } from "express";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from "../../../utils/pg_sql";

const pgSql = pgConnection()

export default new class extends RouterFn {
    constructor() { super('/retaguarda/feedback', 'POST') }

    async fn(req: Request, res: Response) {
        const feedback = req.body;
        pgSql(`insert into tb_feedback (contact, feedbackType, message) values ('${feedback.email}', '${feedback.feedbackType}', '${feedback.message}')`)

        res.status(200).json({
            ok: true
        })
    }
}