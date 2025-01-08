import { TUFranchise } from "../../../@types/data/_user/franchise"
import { TNewUserDefault } from "../../../@types/data/user"

export const franchiseInitial: TNewUserDefault & TUFranchise = {
  branchId: null,
  franchiseId: null,

  id: 0,
  userId: 0,
  contato: "-",
  status: "ATIVO",
  photo: null,
  address: {
    zipCode: "",
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
  region: 0,
  cities: [],
  responsible: {
    id: 0,
    cnpj: "",
    companyName: "",
    cpf: "",
    municipalRegistration: "",
    personName: "",
    responsibleStatus: "ATIVO",
    responsibleType: "CNPJ",
    stateRegistration: "",
    fantasyName: "",
  },
}
