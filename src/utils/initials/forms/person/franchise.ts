import { TNewUserDefault, TUFranchise } from "../../../@types/data/user"

export const franchiseInitial: TNewUserDefault & TUFranchise = {
  userId: 0,
  status: "ATIVO",
  photo: null,
  address: {
    cep: "",
    city: "",
    complement: "",
    country: "br",
    number: "",
    state: "",
    street: "",
  },
  email: "",
  name: "",
  phone1: "",
  phone2: "",
  profile: "FRANQUEADO",
  responsable: {
    type: "cnpj",
    fantasyName: "",
    inscriptionCity: "",
    inscriptionState: "",
    name: "",
    register: "",
  },
}
