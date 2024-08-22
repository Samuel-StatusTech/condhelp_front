import { TUser } from "../data/user"

// Shelfs

export type TUserShelf = TUser | null

// Controls

export type TUserControls = {
  setData: (userData: TUser) => void
  clear: () => void
}

// Data

export type TStore = {
  user: TUserShelf
  controllers: {
    user: TUserControls
  }
}

export type TSet = (
  partial: (state: TStore) => TStore | Partial<TStore>,
  replace?: boolean | undefined
) => void
