import { TUProvider } from "../../../@types/data/_user/provider"
import { TNewUserDefault } from "../../../@types/data/user"

export const providerInitial: TNewUserDefault & TUProvider = {
  branchId: null,
  franchiseId: null,

  id: 0,
  userId: 0,
  profile: "PRESTADOR",
  name: "",
  status: "ATIVO",
  photo: null,

  franqId: 0,

  address: {
    street: "",
    number: "",
    zipCode: "",
    complement: "",
    country: "",
    city: "",
    state: "",
  },

  responsable: "",
  website: "",
  email: "",
  phone1: "",
  phone2: "",
  phone3: "",

  // Comercial info
  socialRole: "",
  document: {
    type: "cnpj",
    register: "",
    date: new Date().toISOString(),
  },
  cnpjCard: null,
  categories: [],

  stateRegistration: "",
  municipalRegistration: "",

  // Documentation
  federalCnd: "",
  federalCndStart: "",
  federalCndEnd: "",
  federalCndFree: false,
  federalCndDocument: null,

  stateCnd: "",
  stateCndStart: "",
  stateCndEnd: "",
  stateCndFree: false,
  stateCndDocument: null,

  cityCnd: "",
  cityCndStart: "",
  cityCndEnd: "",
  cityCndFree: false,
  cityCndDocument: null,

  fgtsCnd: "",
  fgtsCndStart: "",
  fgtsCndEnd: "",
  fgtsCndFree: false,
  fgtsCndDocument: null,

  pendencies: {
    federalCnd: "none",
    stateCnd: "none",
    cityCnd: "none",
    fgts: "none",
  },

  termsAccepted: false,
}
