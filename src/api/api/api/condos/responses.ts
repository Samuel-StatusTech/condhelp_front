import { TCondominium } from "../../../../utils/@types/data/condominium"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Condos = {
  condos: {
    listAll: Promise<TDefaultRes<TDefaultList<TCondominium>>>
    create: Promise<TDefaultRes<{}>>
    getSingle: Promise<TDefaultRes<TCondominium>>
    update: Promise<TDefaultRes<TCondominium>>
    delete: Promise<TDefaultRes<{}>>
    getWaitingList: Promise<TDefaultRes<TDefaultList<TCondominium>>>
    reject: Promise<TDefaultRes<{}>>
    approve: Promise<TDefaultRes<{}>>
  }
}
