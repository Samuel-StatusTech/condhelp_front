export type TNewErrand = {
  title: string
  target: {
    branch: string | null
    franchise: string | null
  }
  status: "sketch" | "send"
  content: {
    image: null | string
    message: string
  }
}

export type TErrand = {
  id: string
  title: string
  target: {
    branch: string | null
    franchise: string | null
  }
  status: "sketch" | "send"
  content: {
    image: null | string
    message: string
  }
  date: string | Date
}
