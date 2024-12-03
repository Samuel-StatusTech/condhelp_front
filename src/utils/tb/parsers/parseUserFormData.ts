import { TUser, TUserTypes } from "../../@types/data/user"

export const getUserObj = (user: TUser, profile: TUser["profile"]) => {
  let data = {}

  switch (profile) {
    case "FILIAL":
      data = getBranchObj(user as any)
      break
    default:
      break
  }

  return data
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
