/*
 *  Admin
 */
import { basicAdmin } from "./admin/basic"
import { extraAdmin } from "./admin/extra"

/*
 *  Branch
 */
import { basicBranch } from "./branch/basic"
import { extraBranch } from "./branch/extra"

/*
 *  Franchise
 */
import { basicFranchise } from "./franchise/basic"
import { extraFranchise } from "./franchise/extra"

/*
 *  Manager
 */
import { basicManager } from "./manager/basic"
import { extraManager } from "./manager/extra"

/*
 *  Provider
 */
import { basicProvider } from "./provider/basic"
import { extraProvider } from "./provider/extra"

export const formPartials = {
  admin: {
    basic: basicAdmin,
    extra: extraAdmin,
  },
  branch: {
    basic: basicBranch,
    extra: extraBranch,
  },
  franchise: {
    basic: basicFranchise,
    extra: extraFranchise,
  },
  manager: {
    basic: basicManager,
    extra: extraManager,
  },
  provider: {
    basic: basicProvider,
    extra: extraProvider,
  },
}
