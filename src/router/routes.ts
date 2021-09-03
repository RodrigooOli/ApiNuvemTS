import { Router } from 'express';
import fs from 'fs'
import cors from 'cors';


const router = Router()

router.use(cors({ origin: '*', methods: "GET, POST" }))

const createRoutes = async () => new Promise(async res => {
    const lsDir = fs.readdirSync(__dirname + '/../galileo_modules/')

    async function criarRotas(list: string[], dir: string) {
        for (let i = 0; i < list.length; i++) {
            const arquivo = list[i];
            const ehPasta = !/(\.js|\.ts)$/g.test(arquivo);

            if (ehPasta) {
                const caminho = dir + `/${arquivo}`;
                await criarRotas(fs.readdirSync(caminho), caminho);
            } else {
                const func = await import(dir + `/${arquivo}`);

                if (func.default?.route) {
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

    await criarRotas(lsDir, __dirname + '/../galileo_modules/')

    res(void 0);
})

async function constructRoutes() {
    await createRoutes();

    return router
}

export default constructRoutes;