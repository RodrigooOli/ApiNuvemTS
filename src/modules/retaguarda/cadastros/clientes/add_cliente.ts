import { cnpj, cpf } from "cpf-cnpj-validator";
import { Request, Response } from "express";
import { ClientConfig } from "pg";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from '../../../../utils/pg_sql'
import { aspasSimplesDB } from "../../../../utils/ultils";
import { rg } from "cpf-rg-validator";
import ie from "inscricaoestadual";

const docInvalido = (doc) => {
    if (`${doc}`.length === 11) {
        if (cpf.isValid(doc)) return null;
        else return 'CPF inválido';
    }

    if (`${doc}`.length === 15) {
        if (cnpj.isValid(doc)) return null;
        else return 'CNPJ inválido';
    }

    return 'CPF ou CNPJ inválido'
}

export default new class extends RouterFn {
    constructor() { super('/retaguarda/add_cliente', 'POST') }

    async fn(req: Request, res: Response) {
        if (!req.body.idLoja) {
            res.json({
                ok: false,
                msg: 'Nenhuma loja selecionada'
            })
            return;
        }

        const docInv = !req.body.cpf_cnpj ? null : docInvalido(req.body.cpf_cnpj);

        if (!!docInv) {
            res.json({
                ok: false,
                msg: docInv
            })
            return;
        }

        if (req.body.tipopessoa === 0 && !!req.body.rg_ie) {
            const ieValid = ie(req.body.rg_ie, req.body.uf)
            if (!ieValid) {
                res.json({
                    ok: false,
                    msg: `Inscrição estadual inválida para ${req.body.uf}`
                })

                return;
            }
        }

        if (req.body.tipopessoa === 1 && !!req.body.rg_ie) {
            const rgValid = rg(req.body.rg_ie)

            if (!rgValid) {
                res.json({
                    ok: false,
                    msg: `RG inválido`
                })

                return;
            }
        }

        const options: ClientConfig = {
            user: 'postgres',
            password: 'avfarila@2021!',
            host: '191.252.220.143',
            database: `d${req.body.idLoja}`,
            port: 5432
        }

        const pgSql = pgConnection(options)

        await pgSql(`insert into tb_cliente (
            tipopessoa,
            cpf_cnpj,
            rg_ie,
            nome,
            fantasia,
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            codibge,
            uf,
            fone,
            cel,
            cliente_func,
            limite_cliente,
            ativo,
            email,
            email2,
            referencia,
            contribuinte,
            taxa_entrega
        ) values (
            ${req.body.tipopessoa || 0},
            '${req.body.cpf_cnpj || ''}',
            '${req.body.rg_ie || ''}',
            '${aspasSimplesDB(req.body.nome || '')}',
            '${aspasSimplesDB(req.body.fantasia || '')}',
            '${req.body.cep}',
            '${aspasSimplesDB(req.body.endereco || '')}',
            ${req.body.numero || 0},
            '${aspasSimplesDB(req.body.complemento || '')}',
            '${aspasSimplesDB(req.body.bairro || '')}',
            '${aspasSimplesDB(req.body.cidade || '')}',
            ${req.body.codibge || 0},
            '${req.body.uf || ''}',
            '${req.body.fone || ''}',
            '${req.body.cel || ''}',
            'C',
            ${req.body.limite_cliente || 0},
            ${!!req.body.ativo ? 1 : 0},
            '${aspasSimplesDB(req.body.email || '')}',
            '${aspasSimplesDB(req.body.email2 || '')}',
            '${aspasSimplesDB(req.body.referencia || '')}',
            ${req.body.contribuinte || 0},
            ${req.body.taxa_entrega || 0}
        )`)

        res.json({
            ok: true,
        })
    }
}