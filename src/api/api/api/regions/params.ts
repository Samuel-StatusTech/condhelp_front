import { TNewRegion } from "../../../../utils/@types/data/region"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Regions = {
  regions: {
    listAll: TDefaultFilters
    create: {
      newRegion: TNewRegion
    }
    update: {
      region: TNewRegion & { id: string }
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
