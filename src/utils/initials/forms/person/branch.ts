import { TUBranch } from "../../../@types/data/_user/branch"
import { TNewUser } from "../../../@types/data/user"

export const branchInitial: TNewUser & TUBranch = {
  branchId: null,
  franchiseId: null,

  id: 0,
  subsidiaryId: 0,
  userAccountId: 0,
  addressId: 0,
  userId: 0,
  status: "ATIVO",
  photo: null,
  address: {
    cep: "",
    city: "",
    complement: "",
    country: "",
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
  responsibleId: 0,
}
