import { PSideMenuItem } from "../@types/components/SideMenuItem"
import { TAccess } from "../@types/data/access"

type TNavItem = {
  text: string
  link: string
  access: TAccess[]
}

export const menu: {
  side: PSideMenuItem[]
  nav: TNavItem[]
} = {
  side: [
    {
      icon: "dashboard",
      text: "Painel",
      link: "",
      tag: "dash",
    },
    {
      icon: "user",
      text: "Usuários",
      link: "/users",
      tag: "users",
      access: ["admin"],
    },
    {
      icon: "condos",
      text: "Condomínios",
      link: "/condos",
      tag: "condos",
      access: ["admin"],
    },
    {
      icon: "folder",
      text: "Categorias",
      link: "/categories",
      tag: "categories",
      access: ["admin"],
    },
    {
      icon: "subcategories",
      text: "Subcategorias",
      link: "/subcategories",
      tag: "subcategories",
      access: ["admin"],
    },
    {
      icon: "location",
      text: "Regiões",
      link: "/regions",
      tag: "regions",
      access: ["admin"],
    },
    {
      icon: "chat",
      text: "Recados",
      link: "/errands",
      tag: "errands",
      access: ["admin"],
    },
    {
      icon: "faq",
      text: "Gerenciar FAQ's",
      link: "/managefaq",
      tag: "managefaq",
      access: ["admin"],
    },
    {
      icon: "reports",
      text: "Relatórios",
      link: "/reports",
      tag: "reports",
      access: ["admin"],
    },
  ],
  nav: [
    {
      text: "Dashboard",
      link: "/dashboard",
      access: ["admin"],
    },
    {
      text: "Monitoramento",
      link: "/overviewing",
      access: ["admin"],
    },
    {
      text: "Histórico de Chamados",
      link: "/callsHistory",
      access: ["admin"],
    },
    {
      text: "Sobre",
      link: "/about",
      access: ["admin"],
    },
    {
      text: "FAQ",
      link: "/faq",
      access: ["admin"],
    },
    {
      text: "Política de privacidade",
      link: "/policy",
      access: ["admin"],
    },
    {
      text: "Minha conta",
      link: "/myaccount",
      access: ["admin"],
    },
  ],
}
