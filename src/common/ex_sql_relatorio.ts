import { pgConnection } from '../utils/pg_sql';

function conn(database) {
    return {
        user: 'postgres',
        password: 'avfarila@2021!',
        host: '191.252.220.143',
        database: database,
        port: 5432
    }
}

export const db = (sql) => {
    return {
        async execute(ids, base = false) {
            if (ids.length == 0) throw 'LojasId não informado!'
            // let ms = Date.now();

            const dbs = ids
            const rows = []
            const promises = []

            for (let i = 0; i < dbs.length; i++) {
                promises.push(new Promise(async (resolve, reject) => {
                    try {
                        const id = dbs[i];
                        const exSql = pgConnection(conn(base ? 'base' : `d${id}`));

                        const rtt = await exSql(sql.replace(/(\$idLoja)/g, id))

                        rows.push(...rtt.map((obj) => ({
                            idLoja: id,
                            ...obj
                        })));

                        resolve(null);
                    } catch (error) {
                        reject(error);
                    }
                }));
            }

            await Promise.all(promises)

            // console.log(`Tempo de execução: ${(Date.now() - ms) + ' millisegundos, ' + (Date.now() - ms) / 1000} segundos`)

            return rows;
        }
    }
}