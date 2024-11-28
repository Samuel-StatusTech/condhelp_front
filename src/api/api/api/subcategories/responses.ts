import { TSubCategory } from "../../../../utils/@types/data/category/subcategories"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Subcategories = {
  subcategories: {
    listAll: Promise<
      TDefaultRes<{
        totalElements: number
        totalPages: number
        pageable: {
          pageNumber: number
          pageSize: number
          sort: {
            sorted: boolean
            empty: boolean
            unsorted: boolean
          }
          offset: number
          paged: boolean
          unpaged: boolean
        }
        first: boolean
        last: boolean
        size: number
        content: TSubCategory[]
        number: number
        sort: {
          sorted: boolean
          empty: boolean
          unsorted: boolean
        }
        numberOfElements: number
        empty: boolean
      }>
    >
    create: Promise<TDefaultRes<TSubCategory>>
    getSingle: Promise<TDefaultRes<TSubCategory>>
    update: Promise<TDefaultRes<TSubCategory>>
    delete: Promise<TDefaultRes<{}>>
  }
}
