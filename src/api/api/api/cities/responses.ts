import { TCity } from "../../../../utils/@types/data/region"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Cities = {
  cities: {
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
        content: TCity[]
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
    create: Promise<TDefaultRes<TCity>>
    getSingle: Promise<TDefaultRes<TCity>>
    update: Promise<TDefaultRes<TCity>>
    delete: Promise<TDefaultRes<{}>>
  }
}
