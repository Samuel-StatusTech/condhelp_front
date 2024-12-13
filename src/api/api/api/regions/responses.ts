import { TRegion } from "../../../../utils/@types/data/region"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Regions = {
  regions: {
    listAll: Promise<TDefaultRes<TDefaultList<TRegion>>>
    create: Promise<TDefaultRes<{}>>
    getSingle: Promise<TDefaultRes<TRegion>>
    update: Promise<TDefaultRes<TRegion>>
    delete: Promise<TDefaultRes<{}>>
  }
}
