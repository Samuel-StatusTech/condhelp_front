import { TState } from "../../../../utils/@types/data/region"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_States = {
  states: {
    listAll: Promise<TDefaultRes<TDefaultList<TState>>>
    create: Promise<TDefaultRes<{}>>
    getSingle: Promise<TDefaultRes<TState>>
    update: Promise<TDefaultRes<TState>>
    delete: Promise<TDefaultRes<{}>>
  }
}
