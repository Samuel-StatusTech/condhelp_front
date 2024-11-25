import { TCountry, TNewCountry } from "../../../../utils/@types/data/region"

export type TApi_Params_Countries = {
  countries: {
    listAll: {}
    create: {
      newCountry: TNewCountry
    }
    update: {
      country: TCountry
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
