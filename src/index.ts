import express from 'express';
import router from './router/routes'
import fs from 'fs'
import https from 'https'
import os from 'os'

const port = 2021;
const app = express()

app.use(express.json());

async function main() {
    const rotas = await router();

    app.use(rotas)

    if (os.platform() === 'linux') {
        const httpsOptions = {
            key: fs.readFileSync('/etc/letsencrypt/live/vps24745.publiccloud.com.br/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/vps24745.publiccloud.com.br/fullchain.pem')
        }

        https.createServer(httpsOptions, app).listen(port, () => {
            console.log('API HTTPS rodando na porta ' + port)
        })
    } else {
        app.listen(port, async () => {
            console.log(`Api rodando na porta ${port}`);
        })
    }
}

main()
