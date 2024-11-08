export type TDocument = {
  cpf: {
    type: "cpf"
    register: string
    birthdate: string
  }
  cnpj: {
    type: "cnpj"
    register: string
    opening: string
  }
}
