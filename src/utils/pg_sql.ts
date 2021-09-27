import { Client, ClientConfig } from 'pg';

interface pgParams {
    where: boolean
}

export const pgConnection = (options?: ClientConfig) => (sql: string, params?: pgParams): Promise<any[]> => {
    params = params ? params : {
        where: true
    }

    const clinte = new Client(options || {
        user: 'postgres',
        password: 'avfarila@2021!',
        host: '191.252.220.143',
        database: 'base',
        port: 5432
    })

    return new Promise(async (resolve, reject) => {
        try {
            if (params.where && (sql.includes('update') || sql.includes('delete')) && !sql.includes('where')) {
                if (sql.includes('update')) {
                    reject('Tentativa de UPDATE sem WHERE')
                } else {
                    reject('Tentativa de DELETE sem WHERE')
                }
                return
            }

            clinte.connect();
            const res = await clinte.query(sql);
            resolve(res.rows)
        } catch (e) {
            console.log('------------------------- SQL ------------------------------')
            console.log(sql)
            console.log('------------------------- SQL ------------------------------')
            reject(e)
        } finally {
            clinte.end();
        }
    })
}