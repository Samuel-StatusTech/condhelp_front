import { TCategory, TNewCategory } from "../../../../utils/@types/data/category"

export type TApi_Params_Categories = {
  categories: {
    listAll: {}
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
