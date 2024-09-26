export type TErrand = {
  id: string
  title: string
  target: {
    branch: string
    franchise: string
  }
  state: "sketch" | "send"
  content: {
    image: null | string
    message: string
  }
  date?: string
}
