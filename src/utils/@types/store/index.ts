import { TFeedback } from "../components/feedback"
import { TUser } from "../data/user"

// Shelfs

export type TUserShelf = TUser | null
export type TFeedbackShelf = TFeedback

// Controls

export type TUserControls = {
  setData: (userData: TUser) => void
  clear: () => void
}

export type TFeedbackControls = {
  setData: (feedbackData: TFeedback) => void
  clear: () => void
  fade: () => void
}

// Data

export type TStore = {
  user: TUserShelf
  feedback: TFeedbackShelf
  controllers: {
    user: TUserControls
    feedback: TFeedbackControls
  }
}

export type TSet = (
  partial: (state: TStore) => TStore | Partial<TStore>,
  replace?: boolean | undefined
) => void
