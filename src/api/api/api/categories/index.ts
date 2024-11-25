/*
 * AUth
 */

import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Categories } from "./params"
import { TApi_Responses_Categories } from "./responses"

const baseURL = "/service-categories"

const listAll: TApi["categories"]["listAll"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, data)
        .then((res) => {
          const info = res.data

          if (info) {
            resolve({
              ok: true,
              data: info.data,
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível listar as categorias. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar as categorias. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar as categorias. Tente novamente mais tarde.",
      })
    }
  })
}

export type TApi_Categories = {
  listAll: (
    p: TApi_Params_Categories["categories"]["listAll"]
  ) => TApi_Responses_Categories["categories"]["listAll"]
}

export const apiCategories = {
  listAll: listAll,
}
