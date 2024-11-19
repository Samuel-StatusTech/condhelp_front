import { FDpeople } from "./people"
import { TCondominium } from "../../@types/data/condominium"
import { TUserTypes } from "../../@types/data/user"

const managers = FDpeople.filter(
  (i) => i.profile === "manager"
) as TUserTypes["manager"][]

export const FDcondos: TCondominium[] = [
  {
    id: "1",
    name: "Condomínio 1",
    units: 8,
    cnpj: "11222333000199",
    image: null,
    address: {
      street: "Rua legal",
      number: "123",
      cep: "88777666",
      neighborhood: "Centro",
      city: "Florianópolis",
      state: "SC",
    },
    manager: managers[0],
    electionFile: undefined,
  },
  {
    id: "2",
    name: "Condomínio 2",
    units: 8,
    cnpj: "11222333000199",
    image: null,
    address: {
      street: "",
      number: "",
      cep: "",
      neighborhood: "",
      city: "Florianópolis",
      state: "SC",
    },
    manager: managers[0],
    electionFile: undefined,
  },
]
