import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Files = {
  files: {
    sendFile: Promise<TDefaultRes<undefined>>
  }
}
