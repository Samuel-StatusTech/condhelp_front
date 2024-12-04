import { TUser, TUserTypes } from "../../@types/data/user"
import { getDateStr } from "../format/date"

export const getUserObj = (user: TUser, profile: TUser["profile"]) => {
  let data = {}

  switch (profile) {
    case "ADMIN":
      data = getAdminObj(user as any)
      break
    case "FILIAL":
      data = getBranchObj(user as any)
      break
    case "SINDICO":
      data = getManagerObj(user as any)
      break
    case "PRESTADOR":
      data = getProviderObj(user as any)
      break
    default:
      break
  }

  return data
}

const getAdminObj = (user: TUserTypes["ADMIN"]) => {
  const info = {
    id: user.userId,
    userId: user.userId,
    photo: user.photo,
    email: user.email,
    profile: user.profile,
    status: user.status,
    name: user.name,
    surname: user.surname,
  }

  return info
}

const getBranchObj = (user: TUserTypes["FILIAL"]) => {
  const info = {
    name: user.name,
    address: {
      // id: 0,
      street: user.address.street,
      number: user.address.number,
      complement: user.address.complement,
      zipCode: user.address.cep,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
    },

    // addressId: 0,
    userAccountId: user.userId,
    providerIds: user.providerIds,
    condominiumIds: user.condominiumIds,
    budgetIds: user.budgetIds,
    franqueadoIds: user.franqueadoIds,
    responsible: {
      // id: 0,
      responsibleType: user.responsible.responsibleType,
      companyName: user.responsible.companyName,
      fantasyName: user.responsible.fantasyName,
      cnpj: user.responsible.cnpj,
      stateRegistration: user.responsible.stateRegistration,
      municipalRegistration: user.responsible.municipalRegistration,
      personName: user.responsible.personName,
      cpf: user.responsible.cpf,
      responsibleStatus: user.responsible.responsibleStatus,
    },
    phone1: user.phone1,
    phone2: user.phone2,
    // responsibleId: 0,
  }

  return info
}

const getManagerObj = (user: TUserTypes["SINDICO"]) => {
  const info = {
    id: user.userId,
    userId: user.userId,
    userAccountId: user.userId,
    name: user.name,
    email: user.email,
    profile: user.profile,
    status: user.status ? "ATIVO" : "INATIVO",
    surname: user.surname,
    phone1: user.phone1,
    phone2: user.phone2,
    documentType: user.documentType,
    documentNumber: user.documentNumber,
    condominiumIds: user.condominiums.map((c) => c.id),
    managerSince: +Math.floor(
      +new Date(user.managerSince).getTime() / 1000
    ).toFixed(0),
    birthDate: getDateStr(user.birthDate, "javaDateTime"),
  }

  return info
}

const getProviderObj = (user: TUserTypes["PRESTADOR"]) => {
  const info = {
    id: user.userId,
    userAccountId: user.userId,
    nome: user.name,
    contato: "",
    status: user.status,
    email: user.email,
    site: user.website,
    razaoSocial: user.socialRole,
    cnpj: user.document,
    urlCartaoCnpj: "",
    dataAbertura: "2024-12-04T04:33:41.318Z",
    // inscricaoEstadual: user.inscricaoEstadual,
    // inscricaoMunicipal: userstate.inscricaoMunicipal,
    inscricaoEstadual: "",
    inscricaoMunicipal: "",
    nomeResponsavel: user.responsable,
    endereco: "",
    cep: "",
  }

  return info
}
