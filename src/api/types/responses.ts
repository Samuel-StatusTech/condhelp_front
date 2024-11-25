export type TDefaultRes<T> =
  | {
      ok: false
      error: string
    }
  | {
      ok: true
      data: T
    }
