import { TApi_Responses_Auth } from "../api/api/auth/responses"
import { TApi_Responses_Categories } from "../api/api/categories/responses"

export type TDefaultRes<T> =
  | {
      ok: false
      error: string
    }
  | {
      ok: true
      data: T
    }

type TResponses = TApi_Responses_Auth & TApi_Responses_Categories

export default TResponses
