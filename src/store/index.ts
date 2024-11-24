import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import { TStore } from "../utils/@types/store"

import { userShelf, feedbackShelf, modalShelf } from "./shelfs"

import controls from "./controllers"

export const getStore = create<TStore>()(
  devtools(
    persist(
      (set) => ({
        user: userShelf(),
        feedback: feedbackShelf(),
        modal: modalShelf(),
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
