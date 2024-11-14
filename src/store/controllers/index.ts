import { TSet } from "../../utils/@types/store"
import userControls from "./userControl"
import feedbackControls from "./feedbackControl"

const controls = (set: TSet) => ({
  user: userControls(set),
  feedback: feedbackControls(set),
})

export default controls
