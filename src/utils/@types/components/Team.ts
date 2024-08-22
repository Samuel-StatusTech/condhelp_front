export type PTeamMember = {
  k: number
  data: {
    id: string
    profile?: string
    name: string
    points: number
    resume: {
      approved: number
      awaiting: number
      denied: number
    }
  }
}
