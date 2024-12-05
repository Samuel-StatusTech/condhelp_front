import {
  TNewSubCategory,
  TSubCategory,
} from "../../../../utils/@types/data/category/subcategories"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Subcategories = {
  subcategories: {
    listAll: TDefaultFilters
    create: {
      newSubcategory: TNewSubCategory
    }
    update: {
      subcategory: TSubCategory
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
