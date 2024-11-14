import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { userShelf, feedbackShelf } from "./shelfs"
import controls from "./controllers"
import { TStore } from "../utils/@types/store"

export const getStore = create<TStore>()(
  devtools(
    persist(
      (set) => ({
        user: userShelf(),
        feedback: feedbackShelf(),
        controllers: controls(set),
      }),
      {
        name: "condhelp",
        partialize: (store) => ({
          user: store.user,
        }),
      }
    )
  )
)
