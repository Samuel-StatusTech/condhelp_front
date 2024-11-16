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
      to: "/dashboard/categories/single",
    },
  ],
  condos: [
    { title: "Condomínios", to: "/dashboard/condos" },
    { title: "Detalhes", to: "/dashboard/condos/single" },
  ],
  errands: [],
  faqs: [],
  regions: [
    { title: "Regiões", to: "/dashboard/regions" },
    { title: "Detalhes da região" },
  ],
  subcategories: [],
  users: [
    { title: "Pessoas", to: "/dashboard/users" },
    { title: "Detalhes", to: "/dashboard/users/single" },
  ],
}
