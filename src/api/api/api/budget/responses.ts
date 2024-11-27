import { TBudget } from "../../../../utils/@types/data/budget"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Budgets = {
  budgets: {
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
        content: TBudget[]
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
    create: Promise<TDefaultRes<{}>>
    getSingle: Promise<TDefaultRes<TBudget>>
    update: Promise<TDefaultRes<TBudget>>
    delete: Promise<TDefaultRes<{}>>
  }
}
