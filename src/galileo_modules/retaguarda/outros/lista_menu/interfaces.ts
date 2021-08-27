export type IMenuList = IMenuItem[]

export interface IMenuItem {
    id: number,
    title: string,
    route: string,
    icon: string,
    disable?: boolean,
    subMenus?: IMenuItem[]
}