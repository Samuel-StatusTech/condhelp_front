import { ModalProps } from "../../../components/Modal"
import { TFeedback } from "../components/feedback"
import { TUser } from "../data/user"

// Shelfs

export type TUserShelf = TUser | null
export type TFeedbackShelf = TFeedback
export type TModalShelf = ModalProps

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

export type TModalControls = {
  open: (data: ModalProps) => void
  close: () => void
}

// Data

export type TStore = {
  user: TUserShelf
  feedback: TFeedbackShelf
  modal: TModalShelf
  controllers: {
    user: TUserControls
    feedback: TFeedbackControls
    modal: TModalControls
  }
}

export type TSet = (
  partial: (state: TStore) => TStore | Partial<TStore>,
  replace?: boolean | undefined
) => void
