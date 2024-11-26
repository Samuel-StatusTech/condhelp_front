import { TNewUser, TUAdmin } from "../../../@types/data/user"

export const ADMINInitial: TNewUser & TUAdmin = {
  userId: 0,
  status: "ATIVO",
  photo: null,
  profile: "ADMIN",
  name: "",
  surname: "",
  email: "",
  document: {
    type: "cpf",
    register: "",
    date: "",
  },
}
