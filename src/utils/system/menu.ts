import { PSideMenuItem } from "../@types/components/SideMenuItem"

export const menu: PSideMenuItem[] = [
  {
    icon: "dashboard",
    text: "Dashboard",
    link: "",
    tag: "dash",
  },
  {
    icon: "users",
    text: "Pessoas",
    link: "/people",
    tag: "people",
    access: "leader",
  },
  {
    icon: "okr",
    text: "OKR",
    link: "/okr",
    tag: "okr",
    access: "employee",
  },
  {
    icon: "goals",
    text: "Metas",
    link: "/goals",
    tag: "goals",
    access: "leader",
  },
  {
    icon: "companies",
    text: "Empresas",
    link: "/companies",
    tag: "companies",
    access: "master",
  },
  {
    icon: "card",
    text: "Departamentos",
    link: "/departments",
    tag: "departments",
    access: "master",
  },
  {
    icon: "banner",
    text: "Banner",
    link: "/banner",
    tag: "banner",
    access: "master",
  },
  {
    icon: "newsboard",
    text: "Mural",
    link: "/newsboard",
    tag: "newsboard",
    access: "master",
  },
]
