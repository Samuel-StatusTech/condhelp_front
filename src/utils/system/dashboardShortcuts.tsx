import { Icons } from "../../assets/icons/icons"
import { TAccess } from "../@types/data/access"

export type PDashboardShortcut = {
  title: string
  icon: keyof typeof iconsRelations
  registers?: number
  text?: string
  link: string
}

export const iconsRelations = {
  FILIAL: <Icons.Branch />,
  FRANQUEADO: <Icons.Franchise />,
  region: <Icons.Location />,
  PRESTADOR: <Icons.Provider />,
  SINDICO: <Icons.Manager />,
  condo: <Icons.Conds />,
  chat: <Icons.Chat />,
  faq: <Icons.Faq />,
  category: <Icons.Category />,
  subcategory: <Icons.Subcategory />,
  user: <Icons.User />,
  settings: <Icons.Settings />,
}

const shortsFranchise: PDashboardShortcut[] = [
  {
    title: "Cadastrar Prestador",
    registers: 3216,
    icon: "PRESTADOR",
    link: "/dashboard/providers/single",
  },
  {
    title: "Cadastrar Sídico",
    registers: 889,
    icon: "SINDICO",
    link: "/dashboard/managers/single",
  },
  {
    title: "Cadastrar Condomínio",
    registers: 213,
    icon: "condo",
    link: "/dashboard/condos/single",
  },
  {
    title: "Cadastrar Recado",
    registers: 78987,
    icon: "chat",
    link: "/dashboard/errands/single",
  },
  {
    title: "Cadastrar FAQ",
    registers: 65,
    icon: "faq",
    link: "/dashboard/faqs/single",
  },
  {
    title: "Cadastrar Categoria",
    registers: 889,
    icon: "category",
    link: "/dashboard/categories/single",
  },
  {
    title: "Cadastrar Subcategoria",
    registers: 213,
    icon: "subcategory",
    link: "/dashboard/subcategories/single",
  },
  {
    title: "Cadastrar Usuário",
    registers: 78987,
    icon: "user",
    link: "/dashboard/users/single",
  },
]

const shortsBranch: PDashboardShortcut[] = [
  {
    title: "Cadastrar Franquia",
    registers: 132,
    icon: "FRANQUEADO",
    link: "/dashboard/FRANQUEADO/single",
  },
  ...shortsFranchise,
]

const shortsAdmin: PDashboardShortcut[] = [
  {
    title: "Cadastrar Filial",
    registers: 65,
    icon: "FILIAL",
    link: "/dashboard/FILIAL/single",
  },
  {
    title: "Cadastrar Região",
    registers: 215,
    icon: "region",
    link: "/dashboard/regions/single",
  },
  ...shortsBranch,
]

export const dashboardShortcuts: { [key in TAccess]: PDashboardShortcut[] } = {
  ADMIN: shortsAdmin,
  FILIAL: shortsBranch,
  FRANQUEADO: shortsFranchise,
  PRESTADOR: [],
  SINDICO: [],
  CONDOMINIO: [],
  MATRIZ: [],
  MONITOR: [],
  USUARIO: [],
}
