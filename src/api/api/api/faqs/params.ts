import { TFaq, TNewFaq } from "../../../../utils/@types/data/faq"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Faqs = {
  faqs: {
    listAll: TDefaultFilters
    create: {
      newFaq: TNewFaq
    }
    update: {
      faq: TFaq
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
