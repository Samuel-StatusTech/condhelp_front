import { TNewErrand } from "../../@types/data/errand"

export const errandForm: TNewErrand = {
  title: "",
  target: {
    REDE: "",
    FRANQUEADO: "",
  },
  status: "sketch",
  content: {
    image: null,
    message: "",
  },
}
