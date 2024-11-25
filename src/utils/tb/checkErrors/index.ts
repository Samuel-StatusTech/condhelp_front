import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { loginCheck } from "./login"

export const checkErrors = {
  login: loginCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}
