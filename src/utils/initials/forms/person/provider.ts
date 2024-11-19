import { TNewUserDefault, TUProvider } from "../../../@types/data/user"

export const providerInitial: TNewUserDefault & TUProvider = {
  profile: "provider",
  name: "",
  active: true,
  image: null,

  franchises: [],

  fantasyName: "",
  address: {
    street: "",
    number: "",
    cep: "",
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

  // Documentation
  federalCnd: "",
  federalCndStart: "",
  federalCndEnd: "",
  federalCndFree: false,

  stateCnd: "",
  stateCndStart: "",
  stateCndEnd: "",
  stateCndFree: false,

  cityCnd: "",
  cityCndStart: "",
  cityCndEnd: "",
  cityCndFree: false,

  fgtsCnd: "",
  fgtsCndStart: "",
  fgtsCndEnd: "",
  fgtsCndFree: false,

  pendencies: {
    federalCnd: "none",
    stateCnd: "none",
    cityCnd: "none",
    fgts: "none",
  },
}
