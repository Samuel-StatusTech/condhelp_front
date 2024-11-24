import { TModalControls, TSet } from "../../utils/@types/store"

const modalControls = (set: TSet): TModalControls => {
  return {
    open(data) {
      set((store) => ({ ...store, modal: data }))
    },
    close: () => {
      set((store) => ({
        ...store,
        modal: {
          visible: false,
          role: "newBudget",
          data: null,
        },
      }))
    },
  }
}

export default modalControls
