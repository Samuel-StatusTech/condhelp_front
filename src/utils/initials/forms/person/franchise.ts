import { TNewUserDefault, TUFranchise } from "../../../@types/data/user"

export const franchiseInitial: TNewUserDefault & TUFranchise = {
  active: true,
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
  image: null,
  name: "",
  phone1: "",
  phone2: "",
  profile: "franchise",
  responsable: {
    type: "cnpj",
    fantasyName: "",
    inscriptionCity: "",
    inscriptionState: "",
    name: "",
    register: "",
  },
}
