import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Condos as TParams } from "./params"
import { TApi_Responses_Condos as TResponses } from "./responses"

const baseURL = "/condominiums"

const listAll: TApi["condos"]["listAll"] = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`)
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
                "Não foi possível listar os condomínios. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar os condomínios. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar os condomínios. Tente novamente mais tarde.",
      })
    }
  })
}

const create: TApi["condos"]["create"] = async ({ newCondo }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newCondo)
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
                "Não foi possível criar o condomínio. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível criar o condomínio. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível criar o condomínio. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["condos"]["update"] = async ({ condo }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${condo.id}`, condo)
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
                "Não foi possível atualizar o condomínio. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar o condomínio. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível atualizar o condomínio. Tente novamente mais tarde.",
      })
    }
  })
}

const deleteItem: TApi["condos"]["delete"] = async ({ id }) => {
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
                "Não foi possível excluir o condomínio. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível excluir o condomínio. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível excluir o condomínio. Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["condos"]["getSingle"] = async ({ id }) => {
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

export type TApi_Condos = {
  listAll: (p: TParams["condos"]["listAll"]) => TResponses["condos"]["listAll"]
  create: (p: TParams["condos"]["create"]) => TResponses["condos"]["create"]
  getSingle: (
    p: TParams["condos"]["getSingle"]
  ) => TResponses["condos"]["getSingle"]
  update: (p: TParams["condos"]["update"]) => TResponses["condos"]["update"]
  delete: (p: TParams["condos"]["delete"]) => TResponses["condos"]["delete"]
}

export const apiCondos: TApi["condos"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
}
