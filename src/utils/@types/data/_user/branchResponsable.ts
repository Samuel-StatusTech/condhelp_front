import { TInscription } from "../inscriptions"

export type TResponsable = ResponsableJuridical | ResponsablePerson

type ResponsableJuridical = {
  type: "juridica"
  social: string
  name: string
  cnpj: string
  inscriptionn: TInscription
}

type ResponsablePerson = {
  type: "fisica"
  cpf: string
  name: string
  surname: string
}
