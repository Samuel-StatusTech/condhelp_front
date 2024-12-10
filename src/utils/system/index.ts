import { menu } from "./menu"

export const system = {
  menu,
} as const

export type TSystem = typeof system
