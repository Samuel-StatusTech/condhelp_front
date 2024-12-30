import { TNewUser, TUAdmin } from "../../../@types/data/user"

export const ADMINInitial: TNewUser & TUAdmin = {
  branchId: null,
  franchiseId: null,

  id: 0,
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
