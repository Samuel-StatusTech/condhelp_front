type Tthead = {
  title: string
  status: boolean
  size?: number | string
}

type TTable = {
  headers: {
    [field: string]: Tthead[]
  }
}

export const tables: TTable = {
  headers: {
    people: [
      { title: "Nome", status: true },
      { title: "E-mail", status: true },
      { title: "Empresa", status: true },
      { title: "Perfil", status: true },
    ],
    goals: [
      { title: "ID", status: true, size: 8 },
      { title: "Nome da Meta", status: true },
      { title: "Autor", status: true },
      { title: "Pontos", status: true },
      { title: "Aprovação", status: true },
      { title: "Público alvo", status: true },
    ],
    companies: [
      { title: "ID", status: true, size: 8 },
      { title: "Nome da Empresa", status: true },
      { title: "CNPJ", status: true },
    ],
    departments: [
      { title: "ID", status: true, size: 8 },
      { title: "Departamento", status: true },
    ],
    newsboard: [
      { title: "ID", status: true, size: 8 },
      { title: "Título", status: true },
      { title: "Autor", status: true },
      { title: "Data da expiração", status: true },
      { title: "Público alvo", status: true },
      { title: "Número de leituras", status: true },
    ],
  },
}
