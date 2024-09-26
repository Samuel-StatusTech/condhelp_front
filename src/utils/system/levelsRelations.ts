import { TAccess } from "../@types/data/access"

export const levelsRelations: { [key in TAccess]: number } = {
  admin: 3,
  branch: 2,
  franchise: 1,
  manager: 0,
  provider: 0,
}
