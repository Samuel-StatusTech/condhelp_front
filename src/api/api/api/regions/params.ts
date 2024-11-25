import { TNewRegion, TRegion } from "../../../../utils/@types/data/region"

export type TApi_Params_Regions = {
  regions: {
    listAll: {}
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
