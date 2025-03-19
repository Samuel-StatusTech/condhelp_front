import { TOption } from "../../@types/data/option"

export const profilesOptions: TOption[] = [
  { key: "all", value: "Todos" },
  { key: "ADMIN", value: "Admin" },
  { key: "REDE", value: "Rede" },
  { key: "FRANQUEADO", value: "Loja" },
  { key: "SINDICO", value: "Síndico" },
  { key: "PRESTADOR", value: "Prestador" },
]

const userOptions = profilesOptions.filter((i) => i.key !== "all")
const adminAllowed = userOptions
const branchAllowed = adminAllowed.filter(
  (i) => i.key !== "ADMIN" && i.key !== "REDE"
)
const franchiseAllowed = branchAllowed.filter((i) => i.key !== "FRANQUEADO")

export const userSubordinates: { [key: string]: TOption[] } = {
  ADMIN: adminAllowed,
  REDE: branchAllowed,
  FRANQUEADO: franchiseAllowed,
}
