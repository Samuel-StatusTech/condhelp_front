import { TApi_Auth } from "../api/api/auth"
import { TApi_Categories } from "../api/api/categories"

export type TApi = {
  auth: TApi_Auth
  categories: TApi_Categories
}
