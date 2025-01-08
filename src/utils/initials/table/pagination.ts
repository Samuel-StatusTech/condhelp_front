import { TDefaultList } from "../../../api/types/responses"

export const initialPagination: TDefaultList<any> = {
  totalElements: 0,
  totalPages: 0,
  pageable: {
    pageNumber: 0,
    pageSize: 0,
    sort: {
      sorted: false,
      empty: false,
      unsorted: false,
    },
    offset: 0,
    paged: false,
    unpaged: false,
  },
  first: false,
  last: false,
  size: 50,
  content: [],
  number: 0,
  sort: {
    sorted: false,
    empty: false,
    unsorted: false,
  },
  numberOfElements: 0,
  empty: false,
}
