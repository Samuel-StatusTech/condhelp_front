export type TNewErrand = {
  title: string
  target: {
    FILIAL: string | null
    FRANQUEADO: string | null
  }
  status: "sketch" | "send"
  content: {
    image: null | string | File
    message: string
  }
}

export type TErrand = {
  id: string
  title: string
  target: {
    FILIAL: string | null
    FRANQUEADO: string | null
  }
  status: "sketch" | "send"
  content: {
    image: null | string
    message: string
  }
  date: string | Date
}
