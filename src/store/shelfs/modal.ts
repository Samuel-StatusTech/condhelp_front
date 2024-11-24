import { TModalShelf } from "../../utils/@types/store"

const modalShelf = (): TModalShelf => {
  return {
    visible: false,
    role: "newBudget",
    data: null,
  }
}

export default modalShelf
