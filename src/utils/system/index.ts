import { menu } from "./menu"
import { tables } from "./tables"
import { levelsRelations } from "./levelsRelations"

export const system = {
  menu,
  tables,
  levelsRelations,
} as const

export type TSystem = typeof system
