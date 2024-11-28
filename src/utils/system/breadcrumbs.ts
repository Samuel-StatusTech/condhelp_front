import { THeaderFrom } from "../../components/PageHeader"

type TBreadCrumbLink = {
  title: string
  to?: string
}

export const breadcrumbs: { [key in THeaderFrom]: TBreadCrumbLink[] } = {
  categories: [
    { title: "Categorias", to: "/dashboard/categories" },
    {
      title: "Detalhes da categoria",
    },
  ],
  condos: [
    { title: "Condomínios", to: "/dashboard/condos" },
    { title: "Detalhes" },
  ],
  errands: [
    { title: "Recados", to: "/dashboard/errands" },
    { title: "Detalhes do recado" },
  ],
  faqs: [
    { title: "Gerenciar FAQ's", to: "/dashboard/managefaq" },
    { title: "Detalhes do FAQ" },
  ],
  faqView: [
    { title: "FAQS" },
  ],
  regions: [
    { title: "Regiões", to: "/dashboard/regions" },
    { title: "Detalhes da região" },
  ],
  subcategories: [
    { title: "Subcategorias", to: "/dashboard/subcategories" },
    { title: "Detalhes da subcategoria" },
  ],
  users: [{ title: "Pessoas", to: "/dashboard/users" }, { title: "Detalhes" }],
}
