import { TBudget } from "../../@types/data/budget"
import { FDcategories } from "./categories"
import { FDpeople } from "./people"

export const FDmanagerBudgets: TBudget[] = [
  {
    id: "1",
    condominium: {
      id: "1",
      name: "Condomínio legal",
      units: 8,
      cnpj: "11222333000199",
      image: null,
      address: {
        street: "Rua legal",
        number: "123",
        cep: "88777666",
        neighborhood: "Centro",
        city: "Florianópolis",
        state: "SC",
      },
    },
    urgent: false,
    category: "Jardinagem",
    subcategory: "Corte de grama",
    title: "Corte de grama profissional",
    description: "Cortar gramado frontal do prédio",
    start: "2024-11-01",
    end: "2024-11-15",
    date: "2024-11-10",
    attached: [],
    status: "approved",
    contacts: [],
  },
  {
    id: "2",
    condominium: {
      id: "1",
      name: "Condomínio legal",
      units: 8,
      cnpj: "11222333000199",
      image: null,
      address: {
        street: "Rua legal",
        number: "123",
        cep: "88777666",
        neighborhood: "Centro",
        city: "Florianópolis",
        state: "SC",
      },
    },
    urgent: false,
    category: "Jardinagem",
    subcategory: "Corte de grama",
    title: "Corte de grama profissional",
    description: "Cortar gramado frontal do prédio",
    start: "2024-11-01",
    end: "2024-11-17",
    date: "2024-11-10",
    attached: [],
    status: "awaiting",
    contacts: [
      {
        id: "1",
        category: {
          id: FDcategories[0].id,
          name: FDcategories[0].name,
        },
        provider: {
          id: FDpeople.filter((p) => p.profile === "provider")[0]?.id,
          name: FDpeople.filter((p) => p.profile === "provider")[0]?.name,
        },
        date: new Date().toISOString(),
      },
    ],
  },
  {
    id: "3",
    condominium: {
      id: "1",
      name: "Condomínio legal",
      units: 8,
      cnpj: "11222333000199",
      image: null,
      address: {
        street: "Rua legal",
        number: "123",
        cep: "88777666",
        neighborhood: "Centro",
        city: "Florianópolis",
        state: "SC",
      },
    },
    urgent: false,
    category: "Jardinagem",
    subcategory: "Corte de grama",
    title: "Corte de grama profissional",
    description: "Cortar gramado frontal do prédio",
    start: "2024-11-01",
    end: "2024-11-18",
    date: "2024-11-10",
    attached: [],
    status: "approved",
    contacts: [],
  },
  {
    id: "4",
    condominium: {
      id: "1",
      name: "Condomínio legal",
      units: 8,
      cnpj: "11222333000199",
      image: null,
      address: {
        street: "Rua legal",
        number: "123",
        cep: "88777666",
        neighborhood: "Centro",
        city: "Florianópolis",
        state: "SC",
      },
    },
    urgent: false,
    category: "Jardinagem",
    subcategory: "Corte de grama",
    title: "Corte de grama profissional",
    description: "Cortar gramado frontal do prédio",
    start: "2024-11-01",
    end: "2024-11-18",
    date: "2024-11-10",
    attached: [],
    status: "awaiting",
    contacts: [],
  },
]
