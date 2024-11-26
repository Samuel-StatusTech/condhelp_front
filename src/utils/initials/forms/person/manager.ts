import { TNewUser, TUManager } from "../../../@types/data/user"

export const managerInitial: TNewUser & TUManager = {
  userId: 0,
  status: "ATIVO",
  photo: null,
  profile: "SINDICO",
  name: "",
  surname: "",
  email: "",
  phone1: "",
  phone2: "",
  document: {
    type: "cpf",
    register: "",
    date: "",
  },
  since: "",
  experience: "01",
  condos: [],
}
