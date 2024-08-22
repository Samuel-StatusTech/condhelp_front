import { TUserLevel } from "../data/user"

export type PSideMenuItem = {
  icon: string
  text: string
  link: string
  tag: string
  access?: TUserLevel
}
