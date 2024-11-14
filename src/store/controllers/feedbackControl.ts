import { TFeedbackControls, TSet } from "../../utils/@types/store"

const feedbackControls = (set: TSet): TFeedbackControls => {
  return {
    setData: (data: any) => {
      set((store) => ({ ...store, feedback: data }))
    },
    clear: () => {
      set((store) => ({
        ...store,
        feedback: {
          ...store.feedback,
          state: "success",
          message: "",
        },
      }))
    },
    fade: () => {
      set((store) => ({
        ...store,
        feedback: {
          ...store.feedback,
          visible: false,
        },
      }))
    },
  }
}

export default feedbackControls
