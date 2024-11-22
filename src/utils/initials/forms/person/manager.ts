import { TNewUser, TUManager } from "../../../@types/data/user"

export const managerInitial: TNewUser & TUManager = {
  profile: "manager",
  active: true,
  name: "",
  surname: "",
  email: "",
  image: null,
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
