import { TSubCategory } from "../../../../utils/@types/data/category/subcategories"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Subcategories = {
  subcategories: {
    listAll: Promise<TDefaultRes<TDefaultList<TSubCategory>>>
    create: Promise<TDefaultRes<TSubCategory>>
    getSingle: Promise<TDefaultRes<TSubCategory>>
    update: Promise<TDefaultRes<TSubCategory>>
    delete: Promise<TDefaultRes<{}>>
  }
}
