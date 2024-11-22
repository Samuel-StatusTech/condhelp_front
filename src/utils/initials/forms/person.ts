import { TAccess } from "../../@types/data/access"
import { TNewUser } from "../../@types/data/user"
import { adminInitial } from "./person/admin"
import { branchInitial } from "./person/branch"
import { franchiseInitial } from "./person/franchise"
import { managerInitial } from "./person/manager"
import { providerInitial } from "./person/provider"

export const personForm: {
  [key in TAccess]: TNewUser
} = {
  admin: adminInitial,
  branch: branchInitial,
  franchise: franchiseInitial,
  manager: managerInitial,
  provider: providerInitial,
}
