type Tthead = {
  title: string
  status: boolean
  size?: number | string
  align?: "left" | "center" | "right"
}

type TTable = {
  headers: {
    [field: string]: Tthead[]
  }
}

export const tables: TTable = {
  headers: {
    users: [
      { title: "Foto", status: true, size: "60px" },
      { title: "Nome", status: true },
      { title: "E-mail", status: true },
      { title: "Empresa", status: false },
      { title: "Perfil", status: true },
    ],
  },
}
