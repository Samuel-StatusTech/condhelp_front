import { TNewState, TState } from "../../../../utils/@types/data/region"

export type TApi_Params_States = {
  states: {
    listAll: {}
    create: {
      newState: TNewState
    }
    update: {
      state: TState
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
