import { TNewUser, TUManager } from "../../../@types/data/user"
import { getMajorityDate } from "../../../tb/helpers/getMajorityDate"

export const managerInitial: TNewUser & TUManager = {
  id: 0,
  franqId: 0,
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
  birthDate: getMajorityDate().getTime(),
  managerSince: 1,
  condominiums: [],
}
