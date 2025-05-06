import { TTag } from "../../../../utils/@types/data/tag"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Tags = {
  tags: {
    listAll: Promise<TDefaultRes<TDefaultList<TTag>>>
    create: Promise<TDefaultRes<TTag>>
    getSingle: Promise<TDefaultRes<TTag>>
    update: Promise<TDefaultRes<TTag>>
    delete: Promise<TDefaultRes<{}>>
  }
}
