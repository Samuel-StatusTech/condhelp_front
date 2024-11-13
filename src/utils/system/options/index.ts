import { profilesOptions as profiles } from "./profiles"
import {
  userStatusOptions,
  errandStatusOptions,
  budgetsStatusOptions,
} from "./status"
import { statesOptions as states } from "./states"

export const systemOptions = {
  profiles,
  states,
  userStatus: userStatusOptions,
  errandStatus: errandStatusOptions,
  budgetsStatus: budgetsStatusOptions,
}
