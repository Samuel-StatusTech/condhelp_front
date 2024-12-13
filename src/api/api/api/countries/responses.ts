import { TCountry } from "../../../../utils/@types/data/region"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Countries = {
  countries: {
    listAll: Promise<TDefaultRes<TDefaultList<TCountry>>>
    create: Promise<TDefaultRes<{}>>
    getSingle: Promise<TDefaultRes<TCountry>>
    update: Promise<TDefaultRes<TCountry>>
    delete: Promise<TDefaultRes<{}>>
  }
}
