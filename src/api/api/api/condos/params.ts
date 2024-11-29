export type TApi_Params_Condos = {
  condos: {
    listAll: {}
    create: {
      newCondo: FormData
    }
    update: {
      condo: FormData
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
