import { TFeedbackShelf } from "../../utils/@types/store"

const feedbackShelf = (): TFeedbackShelf => {
  return {
    state: "success",
    visible: false,
    message: "",
  }
}

export default feedbackShelf
