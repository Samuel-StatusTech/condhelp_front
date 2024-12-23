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
    case "FRANQUEADO":
      data = getFranchiseObj(user as any)
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
    subsidiaryId: user.subsidiaryId,
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

const getFranchiseObj = (user: TUserTypes["FRANQUEADO"]) => {
  const info = {
    id: user.userId,
    nome: user.name,
    contato: user.contato,
    userAccountId: user.userId,
    filialId: user.branchId,
    countryId: user.address.country,
    state: {
      id: user.address.state,
    },
    city: {
      id: user.address.city,
    },
    address: user.address.street,
    number: user.address.number,
    complement: user.address.complement,
    postalCode: user.address.cep,
    phone1: user.phone1,
    phone2: user.phone2,
    email: user.email,
    typePerson: user.responsible.responsibleType === "CNPJ" ? "PJ" : "CPF",

    // Responsable
    corporateName: user.responsible.companyName,
    tradeName: user.responsible.fantasyName,
    cnpj: user.responsible.cnpj,
    stateRegistration: user.responsible.stateRegistration,
    municipalRegistration: user.responsible.municipalRegistration,
    firstName: user.responsible.personName,
    lastName: "-",
    cpf: user.responsible.cpf,
    dateOfBirth: new Date().toISOString(),
    regionId: user.region,
    cityIds: user.cities,
  }

  /*
    id: user.userId,
    userId: user.userId,
    photo: user.photo,
    email: user.email,
    profile: user.profile,
    status: user.status,
    name: user.name,
  */

  return info
}

const getManagerObj = (user: TUserTypes["SINDICO"]) => {
  const info = {
    id: user.userId,
    userId: user.userId,
    userAccountId: user.userId,
    franqId: user.franqId,
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
    id: user.id,
    userAccountId: user.userId,
    name: user.name,
    contact: "-",
    franqId: user.franqId,
    // status: user.status,
    status: "AGUARDANDO",
    email: user.email,
    site: user.website,
    logoUrl: "",
    phone1: user.phone1,
    phone2: user.phone2,
    phone3: user.phone3,
    companyName: user.socialRole,
    cnpj: user.document.register,
    cardCnpjUrl: user.cnpjCard,
    openingDate: getDateStr(user.openingDate ?? new Date(), "javaDateTime"),

    stateRegistration: "",
    municipalRegistration: "",
    responsibleName: user.responsable,

    federalCnd: user.federalCnd,
    federalCndStart: user.federalCndStart
      ? getDateStr(user.federalCndStart, "javaDateTime")
      : "",
    federalCndEnd: user.federalCndEnd
      ? getDateStr(user.federalCndEnd, "javaDateTime")
      : "",
    federalCndFree: user.federalCndFree,
    federalCndDocAttachment: user.federalCndDocument,

    stateCnd: user.stateCnd,
    stateCndStart: user.stateCndStart
      ? getDateStr(user.stateCndStart, "javaDateTime")
      : "",
    stateCndEnd: user.stateCndEnd
      ? getDateStr(user.stateCndEnd, "javaDateTime")
      : "",
    stateCndFree: user.stateCndFree,
    stateCndDocAttachment: user.stateCndDocument,

    cityCnd: user.cityCnd,
    cityCndStart: user.cityCndStart
      ? getDateStr(user.cityCndStart, "javaDateTime")
      : "",
    cityCndEnd: user.cityCndEnd
      ? getDateStr(user.cityCndEnd, "javaDateTime")
      : "",
    cityCndFree: user.cityCndFree,
    cityCndDocAttachment: user.cityCndDocument,

    fgtsCnd: user.fgtsCnd,
    fgtsCndStart: user.fgtsCndStart
      ? getDateStr(user.fgtsCndStart, "javaDateTime")
      : "",
    fgtsCndEnd: user.fgtsCndEnd
      ? getDateStr(user.fgtsCndEnd, "javaDateTime")
      : "",
    fgtsCndFree: user.fgtsCndFree,
    fgtsCndDocAttachment: user.fgtsCndDocument,

    address: {
      street: user.address.street,
      number: user.address.number,
      complement: user.address.complement,
      zipCode: user.address.cep,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
    },
    serviceCategoryIds: user.categories,
  }

  return info
}
