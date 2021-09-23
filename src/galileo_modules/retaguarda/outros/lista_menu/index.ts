import { Request, Response } from "express";
import { RouterFn } from "../../../../models/router_model";
import { pgConnection } from "../../../../utils/pg_sql";
import { IMenuItem, IMenuList } from "./interfaces";

const pgSql = pgConnection();

export default new class extends RouterFn {
    constructor() { super('/retaguarda/get_lista_menu', 'POST') }

    async fn(req: Request, res: Response) {
        const idOperador = req.body.id;

        if (!idOperador) {
            res.json({
                ok: false,
                err: 'propriedade id não existe em req.body',
                body: req.body
            })
            return;
        }

        const rOperador = await pgSql(`select permissao, nivel, id_franquia from tb_operadores where id = ${idOperador}`)

        function permissoes() {
            try {
                const p = JSON.parse(rOperador[0].permissao)
                return p;
            } catch (e) {
                return []
            }
        }

        const permissao = permissoes().filter((p: number) => p !== 28 || rOperador[0].nivel === 4);

        const rMenus = await pgSql('select * from tb_menu')

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

        const menus: IMenuList = rMenus.filter(menu => !menu.id_menu_pai).map(menu => ({
            id: menu.id,
            title: menu.title,
            route: menu.rota,
            icon: menu.icon,
            subMenus: rMenus.filter(submenu => submenu.id_menu_pai === menu.id).map(m => ({
                id: m.id,
                title: m.title,
                route: m.rota,
                icon: m.icon,
                subMenus: rMenus.filter(submenu => submenu.id_menu_pai === m.id).map(m2 => ({
                    id: m2.id,
                    title: m2.title,
                    route: m2.rota,
                    icon: m2.icon,
                    subMenus: [],
                    disable: !m2.ativo || !(rOperador[0].nivel === 4 || permissao.includes(m2.id))
                })).sort((a: any, b: any) => a.title > b.title ? 1 : -1),
                disable: !m.ativo || !(rOperador[0].nivel === 4 || permissao.includes(m.id))
            })).sort((a: any, b: any) => a.title > b.title ? 1 : -1),
            disable: !menu.ativo || !(rOperador[0].nivel === 4 || permissao.includes(menu.id))
        } as IMenuItem)).sort((a: any, b: any) => a.title > b.title ? 1 : -1)

        res.json({
            ok: true,
            body: menus
        })
    }
}