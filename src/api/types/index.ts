import { TApi_Auth } from "../api/api/auth"
import { TApi_Categories } from "../api/api/categories"
import { TApi_Cities } from "../api/api/cities"
import { TApi_States } from "../api/api/states"
import { TApi_Countries } from "../api/api/countries"
import { TApi_Regions } from "../api/api/regions"
import { TApi_Subcategories } from "../api/api/subcategories"
import { TApi_Persons } from "../api/api/persons"

export type TApi = {
  auth: TApi_Auth
  categories: TApi_Categories
  subcategories: TApi_Subcategories
  regions: TApi_Regions
  cities: TApi_Cities
  states: TApi_States
  countries: TApi_Countries
  persons: TApi_Persons
}
