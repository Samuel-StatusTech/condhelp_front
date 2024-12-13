import { TFaq } from "../../../../utils/@types/data/faq"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Faqs = {
  faqs: {
    listAll: Promise<TDefaultRes<TDefaultList<TFaq>>>
    create: Promise<TDefaultRes<{}>>
    getSingle: Promise<TDefaultRes<TFaq>>
    update: Promise<TDefaultRes<TFaq>>
    delete: Promise<TDefaultRes<{}>>
  }
}
