import { TFaq } from "../../../../utils/@types/data/faq"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Faqs = {
  faqs: {
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
        content: TFaq[]
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
    getSingle: Promise<TDefaultRes<TFaq>>
    update: Promise<TDefaultRes<TFaq>>
    delete: Promise<TDefaultRes<{}>>
  }
}
