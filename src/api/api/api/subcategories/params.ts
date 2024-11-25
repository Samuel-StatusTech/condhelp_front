import {
  TNewSubCategory,
  TSubCategory,
} from "../../../../utils/@types/data/category/subcategories"

export type TApi_Params_Subcategories = {
  subcategories: {
    listAll: {}
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
