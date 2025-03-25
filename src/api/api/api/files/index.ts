/*
 * Files
 */

import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Files as TParams } from "./params"
import { TApi_Responses_Files as TResponses } from "./responses"

const baseURL = "/s3"

const sendFile: TApi["files"]["sendFile"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}/upload`, data)
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
                "Não foi possível enviar o arquivo. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível enviar o arquivo. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível enviar o arquivo. Tente novamente mais tarde.",
      })
    }
  })
}

export type TApi_Files = {
  sendFile: (p: TParams["files"]["sendFile"]) => TResponses["files"]["sendFile"]
}

export const apiFiles: TApi["files"] = {
  sendFile: sendFile,
}
