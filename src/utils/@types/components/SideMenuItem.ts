import { TAccess } from "../data/access"

export type PSideMenuItem = {
  icon: string
  text: string
  link?: string
  tag: string
  access?: TAccess[]
  subMenus?: SubMenu[]
}

export type SubMenu = {
  title: string
  link: string
}
