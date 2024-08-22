export type TUser = {
  id: string
  img?: string
  name: string
  surname: string
  email: string
  googleAToken?: string
  company: {
    id: string
    name: string
  }
  level: TUserLevel
}

export type TUserLevel = "master" | "leader" | "employee"

export const levelRelation = {
  master: "Master",
  leader: "Líder",
  employee: "Funcionário",
}