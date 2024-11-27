import { TCondominium } from "./condominium"

export type TCall = {
  id: number
  openedAt: string
  categoryId: number
  title: string
  condo: TCondominium
  closedAt: string
}
