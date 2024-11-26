import { menu } from "./menu"
import { tables } from "./tables"

export const system = {
  menu,
  tables,
} as const

export type TSystem = typeof system
