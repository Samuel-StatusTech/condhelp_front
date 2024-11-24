import { TSet } from "../../utils/@types/store"
import userControls from "./userControl"
import feedbackControls from "./feedbackControl"
import modalControls from "./modalControl"

const controls = (set: TSet) => ({
  user: userControls(set),
  feedback: feedbackControls(set),
  modal: modalControls(set),
})

export default controls
