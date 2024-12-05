import { TNewCondominium } from "../../@types/data/condominium"

export const condoForm: TNewCondominium = {
  name: "",
  unities: 0,
  cnpj: "",
  image: null,
  address: "",
  addressNumber: "",
  zipCode: "",
  neighborhood: "",
  city: "",
  federateUnit: "",
  subsidiaryId: 0,
  manager: {
    userAccountId: 0,
    id: 0,
    userId: 0,
    franchiseId: 0,
    photo: "",
    status: "ATIVO",

    profile: "SINDICO",
    name: "",
    surname: "",
    email: "",

    // Profile info
    phone1: "",
    phone2: "",
    documentType: "cpf",
    documentNumber: "",

    birthDate: "",

    managerSince: new Date().getTime(),

    condominiums: [],
  },
  electionFile: undefined,
}
