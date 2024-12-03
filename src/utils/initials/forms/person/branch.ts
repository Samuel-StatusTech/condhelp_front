import { TNewUser, TUBranch } from "../../../@types/data/user"

export const branchInitial: TNewUser & TUBranch = {
  id: 0,
  userAccountId: 0,
  addressId: 0,
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
  responsible: {
    type: "cnpj",
    id: 0,
    cnpj: "",
    companyName: "",
    cpf: "",
    municipalRegistration: "",
    personName: "",
    responsibleStatus: "ATIVO",
    responsibleType: "FILIAL",
    stateRegistration: "",
    fantasyName: ""
  },
  responsibleId: 0,
  
  budgetIds: [],
  franqueadoIds: [],
  providerIds: [],
  condominiumIds: []
}
