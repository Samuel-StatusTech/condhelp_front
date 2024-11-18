import { TNewCondominium } from "../../@types/data/condominium"

export const condoForm: TNewCondominium = {
  name: "",
  units: 0,
  cnpj: "",
  image: null,
  address: {
    street: "",
    number: "",
    cep: "",
    neighborhood: "",
    city: "",
    state: "",
  },
  manager: {
    id: "",
    since: "",
  },
  electionFile: undefined,
}
