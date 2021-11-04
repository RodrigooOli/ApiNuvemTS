export interface IUser {
    id_operador: string
    id_franquia: number
    cod_atd: number
    nome: string
    login: string
    nivel: number
    cartao: number
    ativo: number
    v_dashboard: boolean
    permissao: number[]
    representante: number
}