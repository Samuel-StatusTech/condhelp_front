import { TUser } from "../../../../utils/@types/data/user"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Persons = {
  persons: {
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
        content: TUser[]
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
    getSingle: Promise<TDefaultRes<TUser>>
    update: Promise<TDefaultRes<TUser>>
    delete: Promise<TDefaultRes<{}>>
  }
}
