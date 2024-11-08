export type TUser = {
  id: string
  status: TUserStatus
  profile: TUserProfile

  name: string
  surname: string
  email: string
  image: null | string
}

export type TUserStatus = "active" | "inactive" | "awaiting"

export type TUserProfile =
  | "admin"
  | "franchise"
  | "branch"
  | "provider"
  | "manager"

export const profileRelation: { [key in TUserProfile]: string } = {
  admin: "Admin",
  franchise: "Franqueado",
  branch: "Filial",
  provider: "Provedor",
  manager: "Síndico",
}

export const statusRelation: { [key in TUserStatus]: string } = {
  active: "Ativo",
  inactive: "Desativado",
  awaiting: "Aguardando",
}
