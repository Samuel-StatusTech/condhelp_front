import { TNewTag, TTag } from "../../../../utils/@types/data/tag"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Tags = {
  tags: {
    listAll: TDefaultFilters
    create: {
      newTag: TNewTag
    }
    update: {
      tag: TTag
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
