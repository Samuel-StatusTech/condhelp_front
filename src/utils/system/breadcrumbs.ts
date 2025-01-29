import { THeaderFrom } from "../../components/PageHeader"

type TBreadCrumbLink = {
  title: string
  to?: string
}

export const breadcrumbs: { [key in THeaderFrom]: TBreadCrumbLink[] } = {
  monitoring: [{ title: "Histórico de chamados" }],
  myaccount: [{ title: "Minha conta" }],
  documents: [{ title: "Documentação" }],
  panelBudget: [{ title: "Painel" }, { title: "Detalhes do Orçamento" }],
  panelProvider: [
    { title: "Painel" },
    { title: "Detalhes do orçamento" },
    { title: "Detalhes do prestador" },
  ],
  categories: [
    { title: "Categorias", to: "/dashboard/categories" },
    { title: "Detalhes da categoria" },
  ],
  condos: [
    { title: "Condomínios", to: "/dashboard/condos" },
    { title: "Detalhes do condomínio" },
  ],
  errands: [
    { title: "Recados", to: "/dashboard/errands" },
    { title: "Detalhes do recado" },
  ],
  faqs: [
    { title: "Gerenciar FAQ's", to: "/dashboard/managefaq" },
    { title: "Detalhes do FAQ" },
  ],
  faqView: [{ title: "FAQS" }],
  regions: [
    { title: "Regiões", to: "/dashboard/regions" },
    { title: "Detalhes da região" },
  ],
  subcategories: [
    { title: "Subcategorias", to: "/dashboard/subcategories" },
    { title: "Detalhes da subcategoria" },
  ],
  users: [{ title: "Pessoas", to: "/dashboard/users" }, { title: "Detalhes" }],
  franchiseCities: [
    { title: "Pessoas" },
    { title: "Detalhes do usuário" },
    { title: "Cidades da Franquia" },
  ],
}
