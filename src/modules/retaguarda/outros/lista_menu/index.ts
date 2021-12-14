import { Request, Response } from "express";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from "../../../../utils/pg_sql";

const pgSql = pgConnection();

const menuFranquia = [
    'Relatórios',
    'Faturamento por dia',
    'Faturamento por loja',
    'Féria do período',
]

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_lista_menu', 'POST') }

    async fn(req: Request, res: Response) {
        const idOperador = req.body.id;

        if (!idOperador) {
            res.json({
                ok: false,
                err: 'propriedade id não recebida',
                body: req.body
            })
            return;
        }

        const rOperador = await pgSql(`select permissao, nivel, id_franquia, cod_empresa from tb_operadores where id = ${idOperador}`)

        function permissoes() {
            try {
                const p = JSON.parse(rOperador[0].permissao)
                return p;
            } catch (e) {
                return []
            }
        }

        const permissao = permissoes().filter((p: number) => p !== 28 || rOperador[0].nivel === 4);

        var rMenus = await pgSql('select * from tb_menu')

        rMenus = rMenus.filter(m => {
            return !req.body.verFranquia || !!m.ver_franquia
        })

        if (!!rOperador[0].id_franquia) {
            rMenus.push({
                id: -2,
                id_menu_pai: 24,
                title: 'Faturamento por loja',
                rota: 'faturamento-por-loja',
                icon: 'relatorios.png',
                ativo: true,
            })
        }

        const listaMenu = [];

        function montaMenu(pArr, lista) {
            if (lista.length === 0) return;

            pArr.push(...lista.map((menu) => {
                const obj = {
                    id: menu.id,
                    title: menu.title,
                    route: menu.rota,
                    icon: menu.icon,
                    subMenus: [],
                    disable: !menu.ativo || !(rOperador[0].nivel === 4 || permissao.includes(menu.id)),
                    hidden: req.body.verFranquia && !menuFranquia.includes(menu.title)
                }

                montaMenu(obj.subMenus, rMenus.filter(m => m.id_menu_pai === menu.id));

                return obj
            }).sort((a, b) => a.title > b.title ? 1 : -1))
        }

        montaMenu(listaMenu, rMenus.filter(menu => !menu.id_menu_pai))

        res.json({
            ok: true,
            body: listaMenu
        })
    }
}