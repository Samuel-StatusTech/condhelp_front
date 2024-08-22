export type TGoal = {
  id: string
  name: string
  author: string
  points: number
  approvement: boolean
  target: "all" | "employee" | "leader"
}
