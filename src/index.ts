import express from 'express';
import router from './router/routes'

const port = 2021;
const app = express()

app.use(express.json())

    ;
(async () => {
    const rotas = await router();

    app.use(rotas)

    app.listen(port, () => {
        console.log(`Api rodando na porta ${port}`);
    })
})()
