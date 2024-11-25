import { TCountry } from "../../../../utils/@types/data/region"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Countries = {
  countries: {
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
        content: TCountry[]
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
    getSingle: Promise<TDefaultRes<TCountry>>
    update: Promise<TDefaultRes<TCountry>>
    delete: Promise<TDefaultRes<{}>>
  }
}
