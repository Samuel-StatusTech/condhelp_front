import { TAccess } from "../../../../utils/@types/data/access"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Auth = {
  auth: {
    requestPasswordLink: Promise<TDefaultRes<{}>>
    register: Promise<TDefaultRes<{}>>
    resetPassword: Promise<TDefaultRes<undefined>>
    login: Promise<
      TDefaultRes<{
        token: string
        userId: number
        renewPassword: boolean
        userAccount: {
          id: number
          userId: number
          photo: null | string
          name: string
          email: string
          profile: TAccess
          status: "ATIVO" | "INATIVO"
          birthDate: null | string
          branchId: null | number
          franchiseId: null | number
          document: null | string
          createdAt: string
          updatedAt: string
        }
      }>
    >
    acceptTerms: Promise<TDefaultRes<undefined>>
  }
}
