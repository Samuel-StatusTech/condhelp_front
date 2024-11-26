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
      access: ["ADMIN", "FILIAL", "FRANQUEADO"],
    },
    {
      icon: "condos",
      text: "Condomínios",
      link: "/condos",
      tag: "condos",
      access: ["ADMIN", "FILIAL", "FRANQUEADO", "SINDICO"],
    },
    {
      icon: "folder",
      text: "Categorias",
      link: "/categories",
      tag: "categories",
      access: ["ADMIN", "FILIAL", "FRANQUEADO", "SINDICO"],
    },
    {
      icon: "subcategories",
      text: "Subcategorias",
      link: "/subcategories",
      tag: "subcategories",
      access: ["ADMIN", "FILIAL", "FRANQUEADO", "SINDICO"],
    },
    {
      icon: "location",
      text: "Regiões",
      link: "/regions",
      tag: "regions",
      access: ["ADMIN"],
    },
    {
      icon: "budget",
      text: "Orçamentos",
      link: "/budgets",
      tag: "budgets",
      access: ["FILIAL", "FRANQUEADO"],
    },
    {
      icon: "chat",
      text: "Recados",
      link: "/errands",
      tag: "errands",
      access: ["ADMIN", "FILIAL", "FRANQUEADO", "SINDICO", "PRESTADOR"],
    },
    {
      icon: "faq",
      text: "Gerenciar FAQ's",
      link: "/managefaq",
      tag: "managefaq",
      access: ["ADMIN"],
    },
    {
      icon: "reports",
      text: "Relatórios",
      link: "/reports",
      tag: "reports",
      access: ["ADMIN", "FILIAL", "FRANQUEADO"],
    },
  ],
  nav: [
    {
      text: "Dashboard",
      link: "/dashboard",
      access: ["ADMIN"],
    },
    {
      text: "Monitoramento",
      link: "/monitoring",
      access: ["ADMIN"],
    },
    {
      text: "Histórico de Chamados",
      link: "/callsHistory",
      access: ["ADMIN"],
    },
    {
      text: "Sobre",
      link: "/about",
      access: ["ADMIN"],
    },
    {
      text: "FAQ",
      link: "/faq",
      access: ["ADMIN"],
    },
    {
      text: "Política de privacidade",
      link: "/policy",
      access: ["ADMIN"],
    },
    {
      text: "Minha conta",
      link: "/myaccount",
      access: ["ADMIN"],
    },
  ],
}
