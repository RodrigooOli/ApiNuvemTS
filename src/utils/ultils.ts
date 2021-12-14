export const arrMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
export const arrMesesMin = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

type formatDateType = 'ext' | 'date' | 'timestamp' | 'date-br' | 'timestamp-br' | 'miniext' | 'mesano';

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


export const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

export const aspasSimplesDB = (text: string): string => (text || '').replace(/'/g, "''")

export const parseNumber = (val): number => +(parseFloat(val || '0').toFixed(2))

export const formatToSearch = (val: string): string => tiraAcento(val).toUpperCase()

export const numbers = (val: any): number => +`${val}`.replace(',', '.').replace(/[^0-9 .]/g, '') || 0


//@ts-ignore
String.prototype.searchDB = function () {
    return aspasSimplesDB(this.toUpperCase()).replace(/ /g, '')
};


//@ts-ignore
export const dataEmDias = (d: string | number | Date): number => Math.trunc((Date.parse(new Date(d)) / 1000 / 60 / 60 / 24) + 1)


export function getMes(d: Date | string | number, formato?: formatDateType) {
    const date = new Date(d || Date.now())
    const m = date.getMonth();

    return {
        inicio: (() => {
            const data = new Date(date.getFullYear(), m, 1, 0, 0, 0)
            return dateFormat(data, formato)
        })(),

        fim: (() => {
            const data = new Date(date.getFullYear(), m + 1, 0, 23, 59, 59)
            return dateFormat(data, formato)
        })(),
    }
}


export function parseReal(val) {
    return parseNumber(val).toLocaleString('pt-br', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    })
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

    const ultimo = (getMes(`${obj.ano}-${mes}-01`).fim as Date).getDate()

    return new Date(`${obj.ano + ano}-${mes}-${obj.dia > ultimo ? ultimo : obj.dia} `);
}


export function dateFormat(date = Date.now() as Date | string | number, tipo?: formatDateType) {
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
        case 'date-br':
            return data.toLocaleDateString('pr-br')
            break;
        case 'timestamp-br':
            return data.toLocaleString('pt-br')
            break;
        case 'mesano':
            return `${arrMeses[new Date(data).getMonth()]} ${data.getFullYear()}`
            break;

        default:
            return data
            break;
    }
}


export function tiraAcento(palavra: string): string {
    const comAcento = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ'
    const semAcento = 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr'

    palavra.split('').forEach(letra => {
        const ind = comAcento.indexOf(letra)

        if (ind !== -1) {
            palavra = palavra.replace(letra, semAcento[ind])
        }
    })

    return palavra
}


export function criaEan13(ean: number | string): string {
    ean = ean.toString().replace(/\D/g, '')
    ean = ean.substr(0, 12).padStart(12, '789000000000')

    let sum = ean.split('').reduce((acc, n, i) => {
        acc += +n * (i % 2 === 0 ? 1 : 3)
        return acc
    }, 0)

    sum = (Math.floor(sum / 10) + 1) * 10 - sum

    // console.log(sum)

    return sum === 10 ? criaEan13(+ean - 1) : `${ean}${sum}`
}


export function validEan13(numero): boolean {
    numero = {
        value: `${numero}`
    }

    let factor = 3;
    let sum = 0;
    let numlen = numero.value.length;

    /// EAN-13
    if (numlen == 13) {
        for (let index = numero.value.length; index > 0; --index) {
            if (index != 13) {
                sum = sum + numero.value.substring(index - 1, index) * factor;
                factor = 4 - factor;
            }
        }

        let cc = ((1000 - sum) % 10);
        let ca = numero.value.substring(12);

        return cc == ca;
    } else return false;
}