import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Faqs as TParams } from "./params"
import { TApi_Responses_Faqs as TResponses } from "./responses"

const baseURL = "/faqs"

const listAll: TApi["faqs"]["listAll"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, data)
        .then((res) => {
          const info = res.data

          if (info) {
            resolve({
              ok: true,
              data: {
                ...info,
                content: info.content.filter((i: any) => !i.removed)
              },
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível listar as faqs. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar as faqs. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível listar as faqs. Tente novamente mais tarde.",
      })
    }
  })
}

const create: TApi["faqs"]["create"] = async ({ newFaq }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .post(`${baseURL}`, newFaq)
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
              error: "Não foi possível criar a faq Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: "Não foi possível criar a faq Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível criar a faq Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["faqs"]["update"] = async ({ faq }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${faq.id}`, faq)
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
                "Não foi possível atualizar a faq Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar a faq Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível atualizar a faq Tente novamente mais tarde.",
      })
    }
  })
}

const deleteItem: TApi["faqs"]["delete"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/inactivate/${id}`)
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
                "Não foi possível excluir a faq Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error: "Não foi possível excluir a faq Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível excluir a faq Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["faqs"]["getSingle"] = async ({ id }) => {
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

export type TApi_Faqs = {
  listAll: (p: TParams["faqs"]["listAll"]) => TResponses["faqs"]["listAll"]
  create: (p: TParams["faqs"]["create"]) => TResponses["faqs"]["create"]
  getSingle: (
    p: TParams["faqs"]["getSingle"]
  ) => TResponses["faqs"]["getSingle"]
  update: (p: TParams["faqs"]["update"]) => TResponses["faqs"]["update"]
  delete: (p: TParams["faqs"]["delete"]) => TResponses["faqs"]["delete"]
}

export const apiFaqs: TApi["faqs"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
}
