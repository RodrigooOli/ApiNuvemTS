import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../models/router_model";
import { pgConnection } from '../../../utils/pg_sql'

export default new class extends RouterFn {
    constructor() { super('/retaguarda/load/:tabela', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        const tabelas = {
            'entregadores': {
                tableName: 'tb_entregador',
                fields: 'id_entregador, nome, endereco, rg, fone, cel',
                where: [
                    req.body.search ? `replace(upper(nome), ' ', '') like '%${req.body.search.searchDB()}%'` : '',
                    req.body.ativos ? 'ativo = 1' : 'ativo = 0'
                ].filter(w => !!w),
                orderBy: [
                    req.body.search ? `replace(upper(nome), ' ', '') like '${req.body.search.searchDB()}%' desc` : '',
                ].filter(o => !!o)
            },


            'formas-de-pagamento': {
                tableName: 'tb_forma_pagamento',
                fields: 'id, descricao, tef, grupo',
                where: [
                    req.body.search ? `replace(upper(descricao), ' ', '') like '%${req.body.search.searchDB()}%'` : '',
                    req.body.ativos ? "ativo = 'S'" : "ativo = 'N'"
                ].filter(w => !!w),
                orderBy: [
                    req.body.search ? `replace(upper(descricao), ' ', '') like '${req.body.search.searchDB()}%' desc` : '',
                ].filter(o => !!o)
            },


            'funcionarios': {
                tableName: 'tb_cliente',
                fields: 'id_cliente, fantasia, nome, cpf_cnpj, rg_ie, fone, cel',
                where: [
                    req.body.search ? `replace(upper(nome), ' ', '') like '%${req.body.search.searchDB()}%'` : '',
                    req.body.ativos ? "ativo = 1" : "ativo = 0"
                ].filter(w => !!w),
                orderBy: [
                    req.body.search ? `replace(upper(nome), ' ', '') like '${req.body.search.searchDB()}%' desc` : '',
                ].filter(o => !!o)
            },


            'materia-prima': {
                tableName: 'tb_produto',
                fields: 'id_produto, cod_interno, gtin, descricao, und, vl_custo',
                where: [
                    'materiaprima = 1',
                    req.body.search ? `replace(upper(descricao), ' ', '') like '%${req.body.search.searchDB()}%'` : '',
                    req.body.ativos ? "ativo = 'S'" : "ativo = 'N'"
                ].filter(w => !!w),
                orderBy: [
                    req.body.search ? `replace(upper(descricao), ' ', '') like '${req.body.search.searchDB()}%' desc` : '',
                ].filter(o => !!o)
            },


            'transportadora': {
                tableName: 'tb_transp',
                fields: 'id_transp, nome, cpf_cnpj, rg_ie, fone, cel',
                where: [
                    req.body.search ? `nome like '%${req.body.search.searchDB()}%'` : '',
                    req.body.ativos ? "ativo = 1" : "ativo = 0"
                ].filter(w => !!w),
                orderBy: [
                    req.body.search ? `nome like '${req.body.search.searchDB()}% desc'` : '',
                ].filter(o => !!o)
            },
        }


        if (!Object.keys(tabelas).includes(req.params.tabela)) {
            res.status(400).send(`Tabela "${req.params.tabela}" não específicada`)
            return
        }


        const { tableName, fields, where, orderBy } = tabelas[req.params.tabela]


        const options: ClientConfig = {
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: `d${req.body.idLoja}`,
            port: 5432
        }

        const pgSql = pgConnection(options)

        const rows = await pgSql(`
            select ${fields} 
            from ${tableName}
            ${!!where?.length ? `where ${where.join(' and ')}` : ''}
            ${!!orderBy?.length ? `order by ${orderBy.join(', ')}` : ''}
        `)

        res.json({
            ok: true,
            body: rows
        })
    }
}