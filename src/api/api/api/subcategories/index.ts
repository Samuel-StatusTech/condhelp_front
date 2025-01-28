/*
 * AUth
 */

import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Subcategories as TParams } from "./params"
import { TApi_Responses_Subcategories as TResponses } from "./responses"

const baseURL = "/service-subcategories"

const listAll: TApi["subcategories"]["listAll"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, {
          params: filters,
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
                "Não foi possível listar as subcategorias. Tente novamente mais tarde. 1",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar as subcategorias. Tente novamente mais tarde. 2",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar as subcategorias. Tente novamente mais tarde. 3",
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
          serviceCategoryId:
            // @ts-ignore
            subcategory.serviceCategoryId ?? subcategory.serviceCategory.id,
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
                "Não foi possível atualizar a categoria 1. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar a categoria 2. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível atualizar a categoria 3. Tente novamente mais tarde.",
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
          if (res.status === 204) {
            resolve({
              ok: true,
              data: {},
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível excluir a subcategoria. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          let backMessage =
            "Não foi possível excluir a subcategoria. Tente novamente mais tarde."

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
      reject({
        error:
          "Não foi possível excluir a subcategoria. Tente novamente mais tarde.",
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
