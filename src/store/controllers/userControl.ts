import { TUserControls, TSet } from "../../utils/@types/store"

const userControls = (set: TSet): TUserControls => {
  return {
    setData: (data: any) => {
      set((store) => ({ ...store, user: data }))
    },
    clear: () => {
      set((store) => ({ ...store, user: null }))
    },
  }
}

export default userControls
