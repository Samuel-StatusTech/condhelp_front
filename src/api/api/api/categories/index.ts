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
              data: {
                ...info,
                content: info.content.filter((i: any) => i.active),
              },
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
      resolve({
        ok: false,
        error:
          "Não foi possível listar as categorias. Tente novamente mais tarde.",
      })
    }
  })
}

const create: TApi["categories"]["create"] = async ({ newCategory }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newCategory)
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
                "Não foi possível criar a categoria. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível criar a categoria. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error:
          "Não foi possível criar a categoria. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["categories"]["update"] = async ({ category }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${category.id}`, category)
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
                "Não foi possível atualizar a categoria. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar a categoria. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error:
          "Não foi possível atualizar a categoria. Tente novamente mais tarde.",
      })
    }
  })
}

const deleteCategory: TApi["categories"]["delete"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/inactivate/${id}`)
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
                "Não foi possível excluir a categoria. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível excluir a categoria. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error:
          "Não foi possível excluir a categoria. Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["categories"]["getSingle"] = async ({ id }) => {
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
      resolve({
        ok: false,
        error:
          "Não foi possível carregar as informações. Tente novamente mais tarde.",
      })
    }
  })
}

export type TApi_Categories = {
  listAll: (
    p: TApi_Params_Categories["categories"]["listAll"]
  ) => TApi_Responses_Categories["categories"]["listAll"]
  create: (
    p: TApi_Params_Categories["categories"]["create"]
  ) => TApi_Responses_Categories["categories"]["create"]
  getSingle: (
    p: TApi_Params_Categories["categories"]["getSingle"]
  ) => TApi_Responses_Categories["categories"]["getSingle"]
  update: (
    p: TApi_Params_Categories["categories"]["update"]
  ) => TApi_Responses_Categories["categories"]["update"]
  delete: (
    p: TApi_Params_Categories["categories"]["delete"]
  ) => TApi_Responses_Categories["categories"]["delete"]
}

export const apiCategories: TApi["categories"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteCategory,
}
