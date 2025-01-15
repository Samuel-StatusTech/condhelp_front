import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Dashboards as TParams } from "./params"
import { TApi_Responses_Dashboards as TResponses } from "./responses"

const baseURL = "/dashboard"

const mainDashboard: TApi["dashboards"]["main"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL

      await service
        .get(`${url}`)
        .then((res) => {
          const info = res.data

          if (info) {
            resolve({
              ok: true,
              data: info,
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível listar os dados. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar os dados. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível listar os dados. Tente novamente mais tarde.",
      })
    }
  })
}

export type TApi_Dashboards = {
  main: (p: TParams["dashboards"]["main"]) => TResponses["dashboards"]["main"]
}

export const apiDashboards: TApi["dashboards"] = {
  main: mainDashboard,
}
