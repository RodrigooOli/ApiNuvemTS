import { Request, Response } from "express";

export class RouterFn {
    constructor(public route: string, public method: 'GET' | 'POST') { }

    protected async fn(req: Request, res: Response): Promise<void> { }

    execute = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.fn(req, res);
        } catch (e) {
            console.log(e)
            res.json({
                ok: false,
                e: e.toString()
            })
        }
    }
}