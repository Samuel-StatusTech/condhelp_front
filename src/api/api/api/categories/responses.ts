import { TCategory } from "../../../../utils/@types/data/category"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Categories = {
  categories: {
    listAll: Promise<TDefaultRes<TDefaultList<TCategory>>>
    create: Promise<TDefaultRes<TCategory>>
    getSingle: Promise<TDefaultRes<TCategory>>
    update: Promise<TDefaultRes<TCategory>>
    delete: Promise<TDefaultRes<{}>>
  }
}
