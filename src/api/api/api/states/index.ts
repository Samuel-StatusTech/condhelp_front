import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_States as TParams } from "./params"
import { TApi_Responses_States as TResponses } from "./responses"

const baseURL = "/states"

const listAll: TApi["states"]["listAll"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}?size=300&sort=name,asc`, data)
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
                "Não foi possível listar as regiões. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar as regiões. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar as regiões. Tente novamente mais tarde.",
      })
    }
  })
}

const create: TApi["states"]["create"] = async ({ newState }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newState)
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
                "Não foi possível criar o estado . Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível criar o estado . Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível criar o estado . Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["states"]["update"] = async ({ state }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${state.id}`, state)
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
                "Não foi possível atualizar o estado . Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar o estado . Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível atualizar o estado . Tente novamente mais tarde.",
      })
    }
  })
}

const deleteItem: TApi["states"]["delete"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .delete(`${baseURL}/${id}`)
        .then((res) => {
          const info = res.data

          if (res.status === 204) {
            resolve({
              ok: true,
              data: info,
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível excluir o estado . Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível excluir o estado . Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível excluir o estado . Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["states"]["getSingle"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/${id}`)
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
                "Não foi possível carregar as informações. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível carregar as informações. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível carregar as informações. Tente novamente mais tarde.",
      })
    }
  })
}

export type TApi_States = {
  listAll: (p: TParams["states"]["listAll"]) => TResponses["states"]["listAll"]
  create: (p: TParams["states"]["create"]) => TResponses["states"]["create"]
  getSingle: (
    p: TParams["states"]["getSingle"]
  ) => TResponses["states"]["getSingle"]
  update: (p: TParams["states"]["update"]) => TResponses["states"]["update"]
  delete: (p: TParams["states"]["delete"]) => TResponses["states"]["delete"]
}

export const apiStates: TApi["states"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
}
