export const relations = {
  roles: {
    admin: "Admin",
    branch: "Filial",
    franchise: "Franquia",
    manager: "Síndico",
    provider: "Prestador",
  },
  status: {
    active: "Ativo",
    awaiting: "Aguardando",
    disabled: "Desativado",
    sketch: "Rascunho",
    send: "Enviado",
  },
  pendencies: {
    has: "Pendente",
    free: "Isento",
    none: "Sem pendência",
  },
  colors: {
    status: {
      active: "#90CC61",
      awaiting: "#FFA903",
      disabled: "#61676A",
      rejected: "#D8484A",
      sketch: "#D8484A",
      send: "#90CC61",
    },
    profile: {
      admin: "#90CC61",
      branch: "#45D0EE",
      franchise: "#45D0EE",
      manager: "#7D37B4",
      provider: "",
    },
    pendencies: {
      none: "#90CC61",
      free: "#45D0EE",
      has: "#D8484A",
    },
  },
}
