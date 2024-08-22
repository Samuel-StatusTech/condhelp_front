import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { userShelf } from "./shelfs"
import controls from "./controllers"
import { TStore } from "../utils/@types/store"

export const getStore = create<TStore>()(
  devtools(
    persist(
      (set) => ({
        user: userShelf(),
        controllers: controls(set),
      }),
      {
        name: "moreira",
        partialize: (store) => ({
          user: store.user,
        }),
      }
    )
  )
)
