import { TNewCity } from "../../../../utils/@types/data/region"

export type TApi_Params_Cities = {
  cities: {
    searchByName: {
      search: string
      stateId?: string | number | null
    }
    listAll: {}
    create: {
      newCity: TNewCity
    }
    update: {
      city: TNewCity & { id: number }
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
