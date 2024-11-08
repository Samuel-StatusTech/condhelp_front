export type TCert = { name: string } & (
  | {
      payment: "paid" | "pendent"
      file: any
    }
  | {
      payment: "free"
      file: null
    }
)
