import { T_Back_Branch } from "../../../../@types/data/_user/branch"
import {
  TResponsableTypes,
  TUDefault,
  TUserTypes,
} from "../../../../@types/data/user"

export const parseUserBranch = (
  backUser: TUDefault & T_Back_Branch
): TUserTypes["FILIAL"] => {
  try {
    // @ts-ignore
    let user: TUserTypes["FILIAL"] = {
      profile: "FILIAL",

      id: backUser.id,
      photo: null,
      status: backUser.status as any,
      userAccountId: backUser.userAccountId,
      userId: backUser.userId,
      name: backUser.name,

      address: {
        country: +backUser.address.country,
        state: +backUser.address.state,
        city: backUser.address.city,
        street: backUser.address.street,
        number: String(backUser.address.number),
        complement: backUser.address.complement,
        cep: backUser.address.zipCode,
      },
      addressId: backUser.address.id,
      phone1: backUser.phone1,
      phone2: backUser.phone2,
      email: backUser.email,

      // Responsable
      responsible: backUser.responsible as TResponsableTypes,
      responsibleId: backUser.responsible.id,
    }

    return user
  } catch (error) {
    return null as any
  }
}
