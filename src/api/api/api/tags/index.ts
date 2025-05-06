/*
 * AUth
 */

import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Tags } from "./params"
import { TApi_Responses_Tags } from "./responses"

const baseURL = "/tag-perfil"

const listAll: TApi["tags"]["listAll"] = async (filters) => {
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
              data: {
                ...info,
                content: info,
              },
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível listar as tags. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar as tags. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error: "Não foi possível listar as tags. Tente novamente mais tarde.",
      })
    }
  })
}

const create: TApi["tags"]["create"] = async ({ newTag }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newTag)
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
                "Não foi possível criar a tag. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: "Não foi possível criar a tag. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error: "Não foi possível criar a tag. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["tags"]["update"] = async ({ tag }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${tag.id}`, tag)
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
                "Não foi possível atualizar a tag. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar a tag. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error: "Não foi possível atualizar a tag. Tente novamente mais tarde.",
      })
    }
  })
}

const deleteCategory: TApi["tags"]["delete"] = async ({ id }) => {
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
                "Não foi possível excluir a tag. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível excluir a tag. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      resolve({
        ok: false,
        error: "Não foi possível excluir a tag. Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["tags"]["getSingle"] = async ({ id }) => {
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

export type TApi_Tags = {
  listAll: (
    p: TApi_Params_Tags["tags"]["listAll"]
  ) => TApi_Responses_Tags["tags"]["listAll"]
  create: (
    p: TApi_Params_Tags["tags"]["create"]
  ) => TApi_Responses_Tags["tags"]["create"]
  getSingle: (
    p: TApi_Params_Tags["tags"]["getSingle"]
  ) => TApi_Responses_Tags["tags"]["getSingle"]
  update: (
    p: TApi_Params_Tags["tags"]["update"]
  ) => TApi_Responses_Tags["tags"]["update"]
  delete: (
    p: TApi_Params_Tags["tags"]["delete"]
  ) => TApi_Responses_Tags["tags"]["delete"]
}

export const apiTags: TApi["tags"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteCategory,
}
