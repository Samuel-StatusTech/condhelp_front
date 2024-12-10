import { T_Back_Provider } from "../../../../@types/data/_user/provider"
import { TUserTypes } from "../../../../@types/data/user"

export const parseUserProvider = (
  backProvider: T_Back_Provider
): TUserTypes["PRESTADOR"] => {
  try {
    let user: TUserTypes["PRESTADOR"] = {
      id: backProvider.id,
      photo: null,
      status: backProvider.status as any,
      userAccountId: backProvider.userAccountId,
      userId: backProvider.id,
      openingDate: backProvider.openingDate,

      category: String(backProvider.serviceCategories[0].id),
      cnpjCard: backProvider.cardCnpjUrl,

      address: {
        country: backProvider.address.country,
        state: backProvider.address.state,
        city: backProvider.address.city,
        street: backProvider.address.street,
        number: String(backProvider.address.number),
        complement: backProvider.address.complement,
        cep: backProvider.address.zipCode,
      },

      profile: "PRESTADOR",
      franchise: String(
        backProvider.subsidiaries.length === 0
          ? null
          : backProvider.subsidiaries[0].franqueados[0].id
      ),
      name: backProvider.name,

      responsable: backProvider.responsibleName,
      website: backProvider.site,
      email: backProvider.email,
      phone1: backProvider.phone1,
      phone2: backProvider.phone2,
      phone3: backProvider.phone3,

      // Comercial info
      socialRole: backProvider.companyName,
      document: {
        date: backProvider.openingDate,
        register: backProvider.cnpj,
        type: "cnpj",
      },

      stateRegistration: !!backProvider.stateRegistration
        ? backProvider.stateRegistration
        : "-",
      municipalRegistration: !!backProvider.municipalRegistration
        ? backProvider.municipalRegistration
        : "-",

      // Documentation
      federalCnd: backProvider.federalCnd,
      federalCndStart: backProvider.federalCndStart ?? "",
      federalCndEnd: backProvider.federalCndEnd ?? "",
      federalCndFree: backProvider.federalCndFree,
      federalCndDocument: backProvider.federalCndDocAttachment,

      stateCnd: backProvider.stateCnd,
      stateCndStart: backProvider.stateCndStart as string,
      stateCndEnd: backProvider.stateCndEnd as string,
      stateCndFree: backProvider.stateCndFree,
      stateCndDocument: backProvider.stateCndDocAttachment,

      cityCnd: backProvider.cityCnd,
      cityCndStart: backProvider.cityCndStart as string,
      cityCndEnd: backProvider.cityCndEnd as string,
      cityCndFree: backProvider.cityCndFree,
      cityCndDocument: backProvider.cityCndDocAttachment,

      fgtsCnd: backProvider.fgtsCnd,
      fgtsCndStart: backProvider.fgtsCndStart as any,
      fgtsCndEnd: backProvider.fgtsCndEnd as any,
      fgtsCndFree: backProvider.fgtsCndFree,
      fgtsCndDocument: backProvider.fgtsCndDocAttachment,

      pendencies: {
        federalCnd: "free",
        stateCnd: "free",
        cityCnd: "free",
        fgts: "free",
      },
    }

    console.log("User parsed: ", user)

    return user
  } catch (error) {
    console.log(error)
    return null as any
  }
}
