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

    franqId: null,
    branchId: null,

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
    subsidiaryId: user.userAccountId,
    name: user.name,
    address: {
      street: user.address.street,
      number: user.address.number,
      complement: user.address.complement,
      zipCode: user.address.zipCode,
      city: user.address.cityId,
      state: user.address.state,
      country: user.address.country,
    },

    userAccountId: user.userAccountId,
    responsible: {
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

    phone1: user.phone1 ?? "",
    phone2: user.phone2 ?? "",
  }

  return info
}

const getFranchiseObj = (user: TUserTypes["FRANQUEADO"]) => {
  const info = {
    id: user.userId,
    nome: user.name,
    name: user.name,
    contato: user.contato,
    userAccountId: user.userId,
    filialId: user.branchId,
    address: {
      street: user.address.street,
      number: user.address.number,
      complement: user.address.complement,
      zipCode: user.address.zipCode,
      city: user.address.city ?? user.address.cityId,
      state: user.address.state,
      country: user.address.country,
    },
    number: user.address.number,
    complement: user.address.complement,
    postalCode: user.address.zipCode,
    phone1: user.phone1 ?? "",
    phone2: user.phone2 ?? "",
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

  return info
}

const getManagerObj = (user: TUserTypes["SINDICO"]) => {
  let info: any = {
    id: user.userId,
    userId: user.userId,
    userAccountId: user.userId,
    branchId: user.branchId,
    franchiseId: user.franqId,
    franqId: user.franqId,
    name: user.name,
    email: user.email,
    profile: user.profile,
    status: user.status ? "ATIVO" : "INATIVO",
    surname: user.surname,
    phone1: user.phone1 ?? "",
    phone2: user.phone2 ?? "",
    documentType: user.documentType,
    documentNumber: user.documentNumber,
    condominiumIds: user.condominiums.map((c) => c.id),
    managerSince: !Number.isNaN(+user.managerSince) ? +user.managerSince : 1,
    birthDate: getDateStr(user.birthDate, "javaDateTime"),
  }

  if (user.managerId !== 0) info.managerId = user.managerId

  return info
}

const getProviderObj = (user: TUserTypes["PRESTADOR"]) => {
  const info = {
    id: user.id,
    userAccountId: user.userId,
    name: user.name,
    contact: "-",
    branchId: user.branchId,
    franchiseId: user.franqId,
    franqId: user.franqId,
    status: user.status,
    email: user.email,
    site: user.website,
    logoUrl: "",
    phone1: user.phone1 ?? "",
    phone2: user.phone2 ?? "",
    phone3: user.phone3 ?? "",
    companyName: user.socialRole,
    cnpj: user.document.register,
    cardCnpjUrl: user.cnpjCard,
    openingDate: getDateStr(user.openingDate ?? new Date(), "javaDateTime"),

    stateRegistration: "",
    municipalRegistration: "",
    responsibleName: user.responsable,

    // CND Federal
    federalCnd: user.federalCndFree ? "" : user.federalCnd,
    federalCndStart: user.federalCndFree
      ? ""
      : user.federalCndStart
      ? getDateStr(user.federalCndStart, "javaDateTime")
      : "",
    federalCndEnd: user.federalCndFree
      ? ""
      : user.federalCndEnd
      ? getDateStr(
          getCndEndValue(user.federalCndStart, user.federalCndEnd),
          "javaDateTime"
        )
      : "",
    federalCndFree: user.federalCndFree,
    federalCndDocAttachment: user.federalCndDocument,

    // CND Estadual
    stateCnd: user.stateCndFree ? "" : user.stateCnd,
    stateCndStart: user.stateCndFree
      ? ""
      : user.stateCndStart
      ? getDateStr(user.stateCndStart, "javaDateTime")
      : "",
    stateCndEnd: user.stateCndFree
      ? ""
      : user.stateCndEnd
      ? getDateStr(
          getCndEndValue(user.stateCndStart, user.stateCndEnd),
          "javaDateTime"
        )
      : "",
    stateCndFree: user.stateCndFree,
    stateCndDocAttachment: user.stateCndDocument,

    // CND Municipal
    cityCnd: user.cityCndFree ? "" : user.cityCnd,
    cityCndStart: user.cityCndFree
      ? ""
      : user.cityCndStart
      ? getDateStr(user.cityCndStart, "javaDateTime")
      : "",
    cityCndEnd: user.cityCndFree
      ? ""
      : user.cityCndEnd
      ? getDateStr(
          getCndEndValue(user.cityCndStart, user.cityCndEnd),
          "javaDateTime"
        )
      : "",
    cityCndFree: user.cityCndFree,
    cityCndDocAttachment: user.cityCndDocument,

    // FGTS
    fgtsCnd: user.fgtsCndFree ? "" : user.fgtsCnd,
    fgtsCndStart: user.fgtsCndFree
      ? ""
      : user.fgtsCndStart
      ? getDateStr(user.fgtsCndStart, "javaDateTime")
      : "",
    fgtsCndEnd: user.fgtsCndFree
      ? ""
      : user.fgtsCndEnd
      ? getDateStr(
          getCndEndValue(user.fgtsCndStart, user.fgtsCndEnd),
          "javaDateTime"
        )
      : "",
    fgtsCndFree: user.fgtsCndFree,
    fgtsCndDocAttachment: user.fgtsCndDocument,

    address: {
      street: user.address.street,
      number: user.address.number,
      complement: user.address.complement,
      zipCode: user.address.zipCode,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
    },
    serviceCategoryIds: user.categories,
  }

  return info
}

const getCndEndValue = (startDate: any, endDate: any) => {
  let newValue = ""

  if (!!startDate && !!endDate) {
    newValue =
      new Date(startDate).getTime() > new Date(endDate).getTime()
        ? startDate
        : endDate
  }

  return newValue
}
