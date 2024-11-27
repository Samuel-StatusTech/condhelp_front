import { TCondominium } from "../../../../utils/@types/data/condominium"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Condos = {
  condos: {
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
        content: TCondominium[]
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
    getSingle: Promise<TDefaultRes<TCondominium>>
    update: Promise<TDefaultRes<TCondominium>>
    delete: Promise<TDefaultRes<{}>>
  }
}
