/*
 * AUth
 */

import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Auth as TParams } from "./params"
import { TApi_Responses_Auth as TResponses } from "./responses"

/*
 * Auth
 */
export type TApi_Auth = {
  register: (p: TParams["auth"]["register"]) => TResponses["auth"]["register"]
  resetPassword: (
    p: TParams["auth"]["resetPassword"]
  ) => TResponses["auth"]["resetPassword"]
  login: (p: TParams["auth"]["login"]) => TResponses["auth"]["login"]
}

const authRegister: TApi["auth"]["register"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`/auth/register`, data)
        .then((res) => {
          const info = res.data

          if (info) {
            resolve({
              ok: true,
              data: info.data,
            })
          } else {
            reject({
              error:
                "Não foi possível fazer o cadastro. Tente novamente mais tarde.",
            })
          }
        })
        .catch(() => {
          resolve({
            ok: false,
            error:
              "Não foi possível fazer o cadastro. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível fazer o cadastro. Tente novamente mais tarde.",
      })
    }
  })
}

const authResetPassword: TApi["auth"]["resetPassword"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`/auth/reset-password`, data)
        .then((res) => {
          const info = res.data

          if (info) {
            resolve({
              ok: true,
              data: info.data,
            })
          } else {
            reject({
              error:
                "Não foi possível alterar sua senha. Tente novamente mais tarde.",
            })
          }
        })
        .catch(() => {
          resolve({
            ok: false,
            error:
              "Não foi possível alterar sua senha. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível alterar sua senha. Tente novamente mais tarde.",
      })
    }
  })
}

const authLogin: TApi["auth"]["login"] = async (data) => {
  return new Promise(async (resolve) => {
    try {
      await service
        .post(`/auth/login`, data)
        .then((res) => {
          const info = res.data

          if (info) {
            // Store token
            sessionStorage.setItem("token", info.token)

            resolve({
              ok: true,
              data: info,
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível fazer o login. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: "Verifique os campos e tente novamente.",
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error: "Verifique os campos e tente novamente.",
      })
    }
  })
}

export const apiAuth = {
  register: authRegister,
  resetPassword: authResetPassword,
  login: authLogin,
}
