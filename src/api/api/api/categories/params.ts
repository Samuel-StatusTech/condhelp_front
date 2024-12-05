import { TCategory, TNewCategory } from "../../../../utils/@types/data/category"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Categories = {
  categories: {
    listAll: TDefaultFilters
    create: {
      newCategory: TNewCategory
    }
    update: {
      category: TCategory
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
