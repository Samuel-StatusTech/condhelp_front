import { TApi_Auth } from "../api/api/auth"
import { TApi_Categories } from "../api/api/categories"
import { TApi_Subcategories } from "../api/api/subcategories"

export type TApi = {
  auth: TApi_Auth
  categories: TApi_Categories
  subcategories: TApi_Subcategories
}
