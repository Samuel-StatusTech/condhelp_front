import { profilesOptions as profiles } from "./profiles"
import {
  userStatusOptions,
  errandStatusOptions,
  budgetsStatusOptions,
} from "./status"
import { statesOptions as states } from "./states"
import { managerTimeOptions } from "./managerTime"

export const systemOptions = {
  accessProfiles: profiles,
  profiles,
  states,
  userStatus: userStatusOptions,
  errandStatus: errandStatusOptions,
  budgetsStatus: budgetsStatusOptions,
  managerTime: managerTimeOptions,
}
