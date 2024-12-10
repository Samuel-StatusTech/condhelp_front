import { TCity } from "../../../../utils/@types/data/region"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Cities = {
  cities: {
    searchByName: Promise<TDefaultRes<TDefaultList<TCity>>>
    listAll: Promise<TDefaultRes<TDefaultList<TCity>>>
    create: Promise<TDefaultRes<TCity>>
    getSingle: Promise<TDefaultRes<TCity>>
    update: Promise<TDefaultRes<TCity>>
    delete: Promise<TDefaultRes<{}>>
  }
}
