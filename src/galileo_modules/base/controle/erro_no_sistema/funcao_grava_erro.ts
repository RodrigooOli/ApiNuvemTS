import fs from "fs";
import { pgConnection } from "../../../../utils/pg_sql"
import { errorObj } from './interfaces'
import { formataDataDB } from '../../../../utils/ultils'

const pgSql = pgConnection();

export const gravaErroSistema = async (obj: errorObj) => {
    try {
        await pgSql(`insert into tb_erros_sistema (
            ident,
            origem,
            origem_d,
            msg,
            data_erro
        ) values (
            '${obj.ident || ''}',
            '${obj.origem}',
            '${obj.origem_d || ''}',
            '${obj.msg}',
            '${formataDataDB(obj.dataErr)}'
        )`);
    } catch (e) {
        const exists = fs.existsSync('./erros_sistema.txt')
        const erros = exists ? fs.readFileSync('./erros_sistema.txt') : '';
        fs.writeFileSync('./erros_sistema.txt', `${erros}\n\n\n` + `[${new Date(Date.now()).toLocaleString('pt-br')}] - ${e.toString()}
        origem: ${obj.origem}
        origem_d: ${obj.origem_d}
        msg: ${obj.msg},
        data_erro: ${obj.dataErr}`)
    }
}