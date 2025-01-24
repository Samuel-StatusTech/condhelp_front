import { T_Back_Provider } from "../../../../@types/data/_user/provider"
import { TUserTypes } from "../../../../@types/data/user"
import { checkProviderPendencyStatus } from "../../../helpers/checkProviderPendencyStatus"

export const parseUserProvider = (
  backProvider: T_Back_Provider
): TUserTypes["PRESTADOR"] => {
  try {
    // @ts-ignore
    let user: TUserTypes["PRESTADOR"] = {
      id: backProvider.id,
      franchiseId: backProvider.franqId,
      branchId: backProvider.branchId,
      photo: null,
      status: backProvider.status as any,
      userAccountId: backProvider.userAccountId,
      userId: backProvider.id,
      openingDate: backProvider.openingDate,

      categories: backProvider.serviceCategories.map((i) => i.id),
      cnpjCard: backProvider.cardCnpjUrl,

      address: {
        country: backProvider.address.country,
        state: backProvider.address.state,
        city: backProvider.address.city,
        street: backProvider.address.street,
        number: String(backProvider.address.number),
        complement: backProvider.address.complement,
        zipCode: backProvider.address.zipCode,
      },

      profile: "PRESTADOR",
      franqId: backProvider.franqId,
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
        federalCnd: checkProviderPendencyStatus({
          isent: backProvider.federalCndFree,
          end: backProvider.federalCndEnd,
          start: backProvider.federalCndStart,
          register: backProvider.federalCnd,
        }),
        stateCnd: checkProviderPendencyStatus({
          isent: backProvider.stateCndFree,
          end: backProvider.stateCndEnd,
          start: backProvider.stateCndStart,
          register: backProvider.stateCnd,
        }),
        cityCnd: checkProviderPendencyStatus({
          isent: backProvider.cityCndFree,
          end: backProvider.cityCndEnd,
          start: backProvider.cityCndStart,
          register: backProvider.cityCnd,
        }),
        fgts: checkProviderPendencyStatus({
          isent: backProvider.fgtsCndFree,
          end: backProvider.fgtsCndEnd,
          start: backProvider.fgtsCndStart,
          register: backProvider.fgtsCnd,
        }),
      },
    }

    return user
  } catch (error) {
    return null as any
  }
}
