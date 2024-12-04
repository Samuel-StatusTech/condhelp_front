/*
 * AUth
 */

import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Subcategories as TParams } from "./params"
import { TApi_Responses_Subcategories as TResponses } from "./responses"

const baseURL = "/service-subcategories"

const listAll: TApi["subcategories"]["listAll"] = async (data) => {
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
                content: info.content.filter(
                  (i: any) => i.serviceCategory.active
                ),
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
      reject({
        error:
          "Não foi possível listar as categorias. Tente novamente mais tarde.",
      })
    }
  })
}

const create: TApi["subcategories"]["create"] = async ({ newSubcategory }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, {
          ...newSubcategory,
          serviceCategoryId: newSubcategory.serviceCategory,
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
      reject({
        error:
          "Não foi possível criar a categoria. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["subcategories"]["update"] = async ({ subcategory }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${subcategory.id}`, {
          id: subcategory.id,
          name: subcategory.name,
          serviceCategoryId: subcategory.serviceCategory,
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
      reject({
        error:
          "Não foi possível atualizar a categoria. Tente novamente mais tarde.",
      })
    }
  })
}

const deleteItem: TApi["subcategories"]["delete"] = async ({ id }) => {
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
      reject({
        error:
          "Não foi possível excluir a categoria. Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["subcategories"]["getSingle"] = async ({ id }) => {
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

export type TApi_Subcategories = {
  listAll: (
    p: TParams["subcategories"]["listAll"]
  ) => TResponses["subcategories"]["listAll"]
  create: (
    p: TParams["subcategories"]["create"]
  ) => TResponses["subcategories"]["create"]
  getSingle: (
    p: TParams["subcategories"]["getSingle"]
  ) => TResponses["subcategories"]["getSingle"]
  update: (
    p: TParams["subcategories"]["update"]
  ) => TResponses["subcategories"]["update"]
  delete: (
    p: TParams["subcategories"]["delete"]
  ) => TResponses["subcategories"]["delete"]
}

export const apiSubcategories: TApi["subcategories"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
}
