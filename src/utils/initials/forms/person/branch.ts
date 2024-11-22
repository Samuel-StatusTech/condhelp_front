import { TNewUser, TUBranch } from "../../../@types/data/user"

export const branchInitial: TNewUser & TUBranch = {
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
  profile: "branch",
  responsable: {
    type: "cnpj",
    fantasyName: "",
    inscriptionCity: "",
    inscriptionState: "",
    name: "",
    register: "",
  },
}
