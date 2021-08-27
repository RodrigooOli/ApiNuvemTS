import { Client, ClientConfig } from 'pg';

export const pgConnection = (options?: ClientConfig) => (sql: string): Promise<any[]> => {
    const clinte = new Client(options || {
        user: 'postgres',
        password: 'avfarila@2021!',
        host: '191.252.220.143',
        database: 'base',
        port: 5432
    })

    return new Promise(async (resolve, reject) => {
        try {
            clinte.connect();
            const res = await clinte.query(sql);
            resolve(res.rows)
        } catch (e) {
            console.log('------------------------- SQL ------------------------------')
            console.log(sql)
            console.log('------------------------- SQL ------------------------------')
            reject(e)
        }
        finally {
            clinte.end();
        }
    })
}