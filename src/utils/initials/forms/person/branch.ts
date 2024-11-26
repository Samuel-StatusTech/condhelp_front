import { TNewUser, TUBranch } from "../../../@types/data/user"

export const branchInitial: TNewUser & TUBranch = {
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
  profile: "FILIAL",
  responsable: {
    type: "cnpj",
    fantasyName: "",
    inscriptionCity: "",
    inscriptionState: "",
    name: "",
    register: "",
  },
}
