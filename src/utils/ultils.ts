export const arrMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
export const arrMesesMin = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export class Copy {
    constructor(obj) {
        Object.keys(obj).forEach(k => this[k] = obj[k]);
    }

    static obj(obj = {}) {
        return { ...new Copy(obj) }
    }

    static array(arr = []) {
        return [...arr].map((obj) => {
            return Object(obj) instanceof Array ? Copy.array(obj) : { ...new Copy(obj) }
        })
    }
}


export function parseNumber(val) {
    return +(parseFloat(val || '0').toFixed(2))
}


export const formataDataDB = (date: any, type: 'date' | 'timestamp' = 'timestamp') => {
    const d = new Date(date).toLocaleString("pt-br")
    const data = d.split(' ')[0]
    const time = d.split(' ')[1]
    if (type === 'date') {
        return data.split("/").reverse().join("-")
    } else {
        return data.split("/").reverse().join("-") + ' ' + time
    }
}


export function getMes(m, formato = 4) {
    if (!m) m = new Date(Date.now()).getMonth() + 1;

    return {
        inicio: (() => {
            const data = new Date(new Date().getFullYear(), m - 1, 1, 0, 0, 0)
            switch (formato) {
                case 1:
                    return data.toLocaleDateString();
                    break;
                case 2:
                    return data.toLocaleString()
                    break;
                case 3:
                    return data.toLocaleDateString("pt-br").split("/").reverse().join("-")
                    break;

                default:
                    return data;
                    break;
            }
        })(),

        fim: (() => {
            const data = new Date(new Date().getFullYear(), m, 0, 23, 59, 59)
            switch (formato) {
                case 1:
                    return data.toLocaleDateString();
                    break;
                case 2:
                    return data.toLocaleString()
                    break;
                case 3:
                    return data.toLocaleDateString("pt-br").split("/").reverse().join("-")
                    break;

                default:
                    return data;
                    break;
            }
        })(),
    }
}


export async function delay(ms: number) {
    await new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}


export function parseReal(val) {
    return parseNumber(val).toLocaleString('pt-br', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    })
}


export function addMesesOld(d: any, qtd: number) {
    const dia = parseInt(d.split('-')[2])
    const mes = parseInt(d.split('-')[1])
    const ultimoDia = getMes(mes + qtd, 3).fim as string

    if (dia > parseInt(ultimoDia.split('-')[2])) {
        d = `${parseInt(d.split('-')[0])}-${mes + 1 + qtd}-01`
    }

    const data = new Date(`${d} `)
    return data
}

export function addMeses(d: string | Date, qtd: number) {
    if (d instanceof Date) d = d.toLocaleDateString().split('/').reverse().join('-')

    const obj = {
        dia: parseInt(d.split('-')[2]),
        mes: parseInt(d.split('-')[1]),
        ano: parseInt(d.split('-')[0]),
    }

    qtd = obj.mes + qtd

    const ano = qtd === 12 ? 0 : Math.floor(qtd / 12);
    const mes = Math.floor(qtd - (ano * 12));

    const ultimo = (getMes(mes, 0).fim as Date).getDate()

    return new Date(`${obj.ano + ano}-${mes}-${obj.dia > ultimo ? ultimo : obj.dia} `);
}

export function aspasSimplesDB(text: string) {
    return (text || '').replace(/'/g, "''")
}

export function dateFormat(date = Date.now(), tipo: 'ext' | 'date' | 'timestamp' | 'miniext' = 'ext') {
    const data = new Date(date)

    switch (tipo) {
        case 'ext':
            return `${data.getDate()} de ${arrMeses[new Date(data).getMonth()]} ${data.getFullYear()}`
            break;
        case 'miniext':
            return `${data.getDate()} ${arrMesesMin[new Date(data).getMonth()]} ${data.getFullYear()}`
            break;
        case 'date':
            return data.toLocaleDateString().split('/').reverse().join('-')
            break;
        case 'timestamp':
            return `${data.toLocaleString().split(' ')[0].split('/').reverse().join('-')} ${data.toLocaleString().split(' ').pop()}`
            break;

        default:
            break;
    }
}