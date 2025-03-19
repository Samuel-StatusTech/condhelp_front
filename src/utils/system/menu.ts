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
      icon: "budget",
      text: "Orçamentos",
      link: "/providerBudgets",
      tag: "providerBudgets",
      access: ["PRESTADOR"],
      subMenus: [
        {
          title: "Orçamentos para Participar",
          link: "/available",
        },
        {
          title: "Orçamentos aguardando Síndico",
          link: "/awaiting",
        },
        {
          title: "Orçamentos Finalizados",
          link: "/finished",
        },
      ],
    },
    {
      icon: "document",
      text: "Documentação",
      link: "/documents",
      tag: "documents",
      access: ["PRESTADOR"],
    },
    {
      icon: "user",
      text: "Usuários",
      link: "/users",
      tag: "users",
      access: ["ADMIN", "REDE", "FRANQUEADO"],
    },
    {
      icon: "condos",
      text: "Condomínios",
      link: "/condos",
      tag: "condos",
      access: ["ADMIN", "REDE", "FRANQUEADO", "SINDICO"],
    },
    {
      icon: "folder",
      text: "Categorias",
      link: "/categories",
      tag: "categories",
      access: ["ADMIN", "REDE", "FRANQUEADO", "SINDICO"],
    },
    {
      icon: "subcategories",
      text: "Subcategorias",
      link: "/subcategories",
      tag: "subcategories",
      access: ["ADMIN", "REDE", "FRANQUEADO", "SINDICO"],
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
      access: ["REDE", "FRANQUEADO"],
    },
    // {
    //   icon: "chat",
    //   text: "Recados",
    //   link: "/errands",
    //   tag: "errands",
    //   access: ["ADMIN", "REDE", "FRANQUEADO", "SINDICO", "PRESTADOR"],
    // },
    {
      icon: "faq",
      text: "Gerenciar FAQ's",
      link: "/managefaq",
      tag: "managefaq",
      access: ["ADMIN"],
    },
    // {
    //   icon: "reports",
    //   text: "Relatórios",
    //   link: "/reports",
    //   tag: "reports",
    //   access: ["ADMIN", "REDE", "FRANQUEADO"],
    // },
  ],
  nav: [
    {
      text: "Dashboard",
      link: "/dashboard",
      access: ["ADMIN", "REDE", "FRANQUEADO", "SINDICO", "PRESTADOR"],
    },
    {
      text: "Monitoramento",
      link: "/monitoring",
      access: ["ADMIN"],
    },
    {
      text: "Histórico de Chamados",
      link: "/callshistory",
      access: ["ADMIN"],
    },
    // {
    //   text: "Sobre",
    //   link: "/about",
    //   access: ["ADMIN"],
    // },
    {
      text: "FAQ",
      link: "/faqs",
      access: ["ADMIN", "REDE", "FRANQUEADO", "SINDICO", "PRESTADOR"],
    },
    // {
    //   text: "Política de privacidade",
    //   link: "/policy",
    //   access: ["ADMIN", "REDE", "FRANQUEADO", "SINDICO", "PRESTADOR"],
    // },
  ],
}
