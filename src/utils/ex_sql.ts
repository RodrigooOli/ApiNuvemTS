import Firebird, { Options } from 'node-firebird';

export const fbConnection = (options: Options) => (sql: string): Promise<any> => {
    const pool = Firebird.pool(1, options);

    return new Promise((resolve, reject) => {

        pool.get(function (err, db) {
            if (err) {
                console.log(err)
                reject(err);
                return
            }

            db.query(sql, [], (error, rows) => {
                if (error) {
                    console.log(error)
                    console.log('////////////////////////////////// -- SQL -- /////////////////////////////////')
                    console.log(sql)
                    console.log('////////////////////////////////// -- SQL -- /////////////////////////////////')
                    reject(error);
                    return
                };

                resolve(rows)
                db.detach();
                pool.destroy();
            })
        });
    })
}
