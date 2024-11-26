export const relations = {
  roles: {
    ADMIN: "Admin",
    FILIAL: "Filial",
    FRANQUEADO: "Franquia",
    SINDICO: "Síndico",
    PRESTADOR: "Prestador",

    USUARIO: "",
    MATRIZ: "",
    CONDOMINIO: "",
    MONITOR: "",
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
      ADMIN: "#90CC61",
      FILIAL: "#45D0EE",
      FRANQUEADO: "#45D0EE",
      SINDICO: "#7D37B4",
      PRESTADOR: "",

      USUARIO: "",
      MATRIZ: "",
      CONDOMINIO: "",
      MONITOR: "",
    },
    pendencies: {
      none: "#90CC61",
      free: "#45D0EE",
      has: "#D8484A",
    },
  },
}
