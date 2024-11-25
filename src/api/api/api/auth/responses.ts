import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Auth = {
  auth: {
    register: Promise<TDefaultRes<{}>>
    resetPassword: Promise<TDefaultRes<{ token: string }>>
    login: Promise<TDefaultRes<{ success: boolean }>>
  }
}
