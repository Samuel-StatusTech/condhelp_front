import { TNewUser, TUManager } from "../../../@types/data/user"

export const managerInitial: TNewUser & TUManager = {
  id: 0,
  franchiseId: 0,
  userId: 0,
  status: "ATIVO",
  photo: null,
  profile: "SINDICO",
  name: "",
  surname: "",
  email: "",
  phone1: "",
  phone2: "",
  documentType: "cpf",
  documentNumber: "",
  birthDate: new Date().getTime(),
  managerSince: 1,
  condominiums: [],
}
