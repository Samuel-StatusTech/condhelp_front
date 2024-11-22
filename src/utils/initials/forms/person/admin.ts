import { TNewUser, TUAdmin } from "../../../@types/data/user"

export const adminInitial: TNewUser & TUAdmin = {
  profile: "admin",
  active: true,
  name: "",
  surname: "",
  email: "",
  document: {
    type: "cpf",
    register: "",
    date: "",
  },
  image: null,
}
