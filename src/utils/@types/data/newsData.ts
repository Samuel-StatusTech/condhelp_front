export type TNewsData = {
  id: string
  title: string
  author: string
  expiration?: string
  target: [string]
  reads: {
    reads: number
    total: number
  }
}
