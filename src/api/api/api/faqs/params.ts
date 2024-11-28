import { TFaq, TNewFaq } from "../../../../utils/@types/data/faq"

export type TApi_Params_Faqs = {
  faqs: {
    listAll: {}
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
