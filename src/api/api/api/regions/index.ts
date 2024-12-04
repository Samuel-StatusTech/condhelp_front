import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Regions as TParams } from "./params"
import { TApi_Responses_Regions as TResponses } from "./responses"

const baseURL = "/regions"

const listAll: TApi["regions"]["listAll"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, {
          params: {
            size: 300,
          },
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

const create: TApi["regions"]["create"] = async ({ newRegion }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, {
          ...newRegion,
          citiesIds: newRegion.cities.map((i) => i.id),
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
                "Não foi possível criar a região. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível criar a região. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível criar a região. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["regions"]["update"] = async ({ region }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${region.id}`, region)
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
                "Não foi possível atualizar a região. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar a região. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível atualizar a região. Tente novamente mais tarde.",
      })
    }
  })
}

const deleteItem: TApi["regions"]["delete"] = async ({ id }) => {
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
                "Não foi possível excluir a região. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível excluir a região. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível excluir a região. Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["regions"]["getSingle"] = async ({ id }) => {
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

export type TApi_Regions = {
  listAll: (
    p: TParams["regions"]["listAll"]
  ) => TResponses["regions"]["listAll"]
  create: (p: TParams["regions"]["create"]) => TResponses["regions"]["create"]
  getSingle: (
    p: TParams["regions"]["getSingle"]
  ) => TResponses["regions"]["getSingle"]
  update: (p: TParams["regions"]["update"]) => TResponses["regions"]["update"]
  delete: (p: TParams["regions"]["delete"]) => TResponses["regions"]["delete"]
}

export const apiRegions: TApi["regions"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
}
