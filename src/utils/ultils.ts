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


export function getMes(m, formato) {
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