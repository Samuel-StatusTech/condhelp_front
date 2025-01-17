import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Monitoring as TParams } from "./params"
import { TApi_Responses_Monitoring as TResponses } from "./responses"

const baseURL = "/monitor"

const getList: TApi["monitoring"]["getList"] = async (filters) => {
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

const getSingle: TApi["monitoring"]["getSingle"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL

      await service
        .get(`${url}/${id}`)
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

const attendSingle: TApi["monitoring"]["attendSingle"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL

      await service
        .post(`${url}/attendRequest/${id}`)
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
                "Não foi possível atender ao chamado. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atender ao chamado. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível atender ao chamado. Tente novamente mais tarde.",
      })
    }
  })
}

const closeRequest: TApi["monitoring"]["closeRequest"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL

      await service
        .put(`${url}/closedRequest/${id}`)
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
                "Não foi possível atender ao chamado. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atender ao chamado. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível atender ao chamado. Tente novamente mais tarde.",
      })
    }
  })
}

const registerRequest: TApi["monitoring"]["registerRequest"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL

      await service
        .post(`${url}/register`, data)
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
                "Não foi possível registrar o atendimento. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível registrar o atendimento. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível registrar o atendimento. Tente novamente mais tarde.",
      })
    }
  })
}

export type TApi_Monitoring = {
  getList: (
    p: TParams["monitoring"]["getList"]
  ) => TResponses["monitoring"]["getList"]
  attendSingle: (
    p: TParams["monitoring"]["attendSingle"]
  ) => TResponses["monitoring"]["attendSingle"]
  closeRequest: (
    p: TParams["monitoring"]["closeRequest"]
  ) => TResponses["monitoring"]["closeRequest"]
  getSingle: (
    p: TParams["monitoring"]["getSingle"]
  ) => TResponses["monitoring"]["getSingle"]
  registerRequest: (
    p: TParams["monitoring"]["registerRequest"]
  ) => TResponses["monitoring"]["registerRequest"]
}

export const apiMonitoring: TApi["monitoring"] = {
  getList: getList,
  attendSingle: attendSingle,
  closeRequest: closeRequest,
  getSingle: getSingle,
  registerRequest: registerRequest,
}
