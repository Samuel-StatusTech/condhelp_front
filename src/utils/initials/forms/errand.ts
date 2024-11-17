import { TNewErrand } from "../../@types/data/errand"

export const errandForm: TNewErrand = {
  title: "",
  target: {
    branch: "",
    franchise: "",
  },
  status: "sketch",
  content: {
    image: null,
    message: "",
  },
}
