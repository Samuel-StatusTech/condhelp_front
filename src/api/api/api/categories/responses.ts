import { TCategory } from "../../../../utils/@types/data/category"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Categories = {
  categories: {
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
        content: TCategory[]
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
    create: Promise<TDefaultRes<TCategory>>
    getSingle: Promise<TDefaultRes<TCategory>>
    update: Promise<TDefaultRes<TCategory>>
    delete: Promise<TDefaultRes<{}>>
  }
}
