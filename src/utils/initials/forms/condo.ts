import { TNewCondominium } from "../../@types/data/condominium"

export const condoForm: TNewCondominium = {
  name: "",
  unities: 0,
  cnpj: "",
  photo: null,
  address: "",
  addressNumber: "0",
  zipCode: "",
  neighborhood: "",
  city: "",
  federateUnit: "",
  subsidiaryId: 0,

  electionDate: new Date(new Date().setHours(-24)).getTime(),

  // @ts-ignore
  manager: {
    userAccountId: 0,
    id: 0,
    userId: 0,
    franqId: 0,
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

    managerSince: 1,

    condominiums: [],
  },
  electionFile: null,
}
