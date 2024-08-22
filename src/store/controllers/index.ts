import { TSet } from "../../utils/@types/store"
import userControls from "./userControl"

const controls = (set: TSet) => ({
  user: userControls(set),
})

export default controls
