import {
  TNewUserDefault,
  TUAdmin,
  TUBranch,
  TUFranchise,
  TUManager,
  TUProvider,
} from "../../@types/data/user"
import { providerInitial } from "./person/provider"

// const k: TNewUserDefault & TUBranch = {}

export const personForm: {
  admin: TNewUserDefault & TUAdmin
  branch: TNewUserDefault & TUBranch
  franchise: TNewUserDefault & TUFranchise
  manager: TNewUserDefault & TUManager
  provider: TNewUserDefault & TUProvider
} = {
  admin: {
    profile: "admin",
    active: true,
    name: "",
    surname: "",
    email: "",
    document: {
      type: "cpf",
      register: "",
      date: "",
    },
    image: null,
  },
  branch: {
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
  },
  franchise: {
    profile: "franchise",
    name: "",
    active: true,
    image: null,
  },
  manager: {
    profile: "manager",
    active: true,
    name: "",
    surname: "",
    email: "",
    image: null,
    phone1: "",
    phone2: "",
    document: {
      type: "cpf",
      register: "",
      date: "",
    },
    since: "",
    experience: "01",
    condos: [],
  },
  provider: providerInitial,
}
