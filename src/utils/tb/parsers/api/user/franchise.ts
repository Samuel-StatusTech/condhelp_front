import { T_Back_Franchise } from "../../../../@types/data/_user/franchise"
import { TUDefault, TUserTypes } from "../../../../@types/data/user"

export const parseUserFranchise = (
  backUser: TUDefault & T_Back_Franchise
): TUserTypes["FRANQUEADO"] => {
  try {
    // @ts-ignore
    let user: TUserTypes["FRANQUEADO"] = {
      profile: "FRANQUEADO",

      id: backUser.id,
      photo: null,
      status: backUser.status as any,
      userAccountId: backUser.userAccountId,
      userId: backUser.userId,
      name: backUser.nome,

      address: {
        country: +backUser.address.country,
        state: +backUser.address.state,
        city: backUser.address.city,
        street: backUser.address.street,
        number: String(backUser.address.number),
        complement: backUser.address.complement,
        zipCode: backUser.address.zipCode,
      },
      // addressId: backUser.address.id,
      phone1: backUser.phone1,
      phone2: backUser.phone2,
      email: backUser.email,

      // Responsable
      responsible: {
        cnpj: backUser.cnpj,
        companyName: backUser.corporateName,
        cpf: backUser.cpf,
        fantasyName: backUser.tradeName,
        municipalRegistration: backUser.municipalRegistration,
        personName: backUser.firstName,
        responsibleType: backUser.typePerson as "CNPJ" | "CPF",
        stateRegistration: backUser.stateRegistration,
      },
      // responsibleId: backUser.responsible.id,

      region: backUser.regionId,
      cities: backUser.cityIds,
    }

    return user
  } catch (error) {
    return null as any
  }
}
