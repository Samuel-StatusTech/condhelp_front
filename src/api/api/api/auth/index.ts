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
  requestPasswordLink: (
    p: TParams["auth"]["requestPasswordLink"]
  ) => TResponses["auth"]["requestPasswordLink"]
  register: (p: TParams["auth"]["register"]) => TResponses["auth"]["register"]
  resetPassword: (
    p: TParams["auth"]["resetPassword"]
  ) => TResponses["auth"]["resetPassword"]
  login: (p: TParams["auth"]["login"]) => TResponses["auth"]["login"]
}

const requestPasswordLink: TApi["auth"]["requestPasswordLink"] = async (
  data
) => {
  return new Promise(async (resolve) => {
    try {
      await service
        .post(`/auth/requestPasswordLink`, data)
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
                "Não foi possível requisitar o link. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          let backMessage =
            "Não foi possível requisitar o link. Tente novamente mais tarde."

          if (
            err.response?.status === 400 &&
            err.response &&
            err.response.data
          ) {
            backMessage = (err.response.data as any).error
          }

          resolve({
            ok: false,
            error: backMessage,
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error: "Não foi possível fazer o cadastro. Tente novamente mais tarde.",
      })
    }
  })
}

const authRegister: TApi["auth"]["register"] = async (data) => {
  return new Promise(async (resolve) => {
    try {
      await service
        .post(`/auth/register`, {
          ...data,
          tipo: data.tipo === "FRANQUEADO" ? "USUARIO" : data.tipo,
        })
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
                "Não foi possível fazer o cadastro. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          let backMessage =
            "Não foi possível fazer o cadastro. Tente novamente mais tarde."

          if (
            err.response?.status === 400 &&
            err.response &&
            err.response.data
          ) {
            backMessage = (err.response.data as any).error
          }

          resolve({
            ok: false,
            error: backMessage,
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error: "Não foi possível fazer o cadastro. Tente novamente mais tarde.",
      })
    }
  })
}

const authResetPassword: TApi["auth"]["resetPassword"] = async (data) => {
  return new Promise(async (resolve) => {
    try {
      await service
        .post(`/auth/reset-password`, data)
        .then((res) => {
          const isOk = res.status === 200

          if (isOk) {
            resolve({
              ok: true,
              data: undefined,
            })
          } else {
            resolve({
              ok: false,
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
      resolve({
        ok: false,
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
            localStorage.setItem("token", info.token)

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
  requestPasswordLink: requestPasswordLink,
  register: authRegister,
  resetPassword: authResetPassword,
  login: authLogin,
}
