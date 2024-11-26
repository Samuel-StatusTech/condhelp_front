import { TNewErrand } from "../../@types/data/errand"

export const errandForm: TNewErrand = {
  title: "",
  target: {
    FILIAL: "",
    FRANQUEADO: "",
  },
  status: "sketch",
  content: {
    image: null,
    message: "",
  },
}
