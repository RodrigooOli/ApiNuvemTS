import { Router } from 'express';
import fs from 'fs'
import cors from 'cors';
import { RouterFn } from '../models/router_model';

const router = Router()

router.use(cors({ origin: '*', methods: "GET, POST" }))

const createRoutes = async (): Promise<Router> => new Promise(async res => {
    const lsDir = fs.readdirSync(__dirname + '/../modules/')

    async function criarRotas(list: string[], dir: string) {
        for (let i = 0; i < list.length; i++) {
            const arquivo = list[i];
            const ehPasta = !/(\.js|\.ts)$/g.test(arquivo);

            if (ehPasta) {
                const caminho = dir + `/${arquivo}`;
                await criarRotas(fs.readdirSync(caminho), caminho);
            } else {
                const func = await import(dir + `/${arquivo}`);

                if (func.default instanceof RouterFn) {
                    switch (func.default?.method) {
                        case 'GET':
                            router.get(`${func.default?.route}`, func.default?.execute)
                            break;
                        case 'POST':
                            router.post(`${func.default?.route}`, func.default?.execute)
                            break;
                    }
                }
            }
        }
    }

    await criarRotas(lsDir, __dirname + '/../modules/')

    res(router);
})

export default createRoutes;