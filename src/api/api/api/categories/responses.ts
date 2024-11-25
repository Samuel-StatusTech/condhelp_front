import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Categories = {
  categories: {
    listAll: Promise<TDefaultRes<{}>>
  }
}
