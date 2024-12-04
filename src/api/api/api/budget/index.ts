import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Budgets as TParams } from "./params"
import { TApi_Responses_Budgets as TResponses } from "./responses"

const baseURL = "/budgets"

const listAll: TApi["budgets"]["listAll"] = async () => {
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
                "Não foi possível listar os orçamentos. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar os orçamentos. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar os orçamentos. Tente novamente mais tarde.",
      })
    }
  })
}

const create: TApi["budgets"]["create"] = async ({ newBudget }) => {
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
                "Não foi possível criar o orçamento. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível criar o orçamento. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível criar o orçamento. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["budgets"]["update"] = async ({ budget }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${budget.id}`, budget)
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
                "Não foi possível atualizar o orçamento. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar o orçamento. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível atualizar o orçamento. Tente novamente mais tarde.",
      })
    }
  })
}

const deleteItem: TApi["budgets"]["delete"] = async ({ id }) => {
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
                "Não foi possível excluir o orçamento. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível excluir o orçamento. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível excluir o orçamento. Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["budgets"]["getSingle"] = async ({ id }) => {
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

export type TApi_Budgets = {
  listAll: (
    p: TParams["budgets"]["listAll"]
  ) => TResponses["budgets"]["listAll"]
  create: (p: TParams["budgets"]["create"]) => TResponses["budgets"]["create"]
  getSingle: (
    p: TParams["budgets"]["getSingle"]
  ) => TResponses["budgets"]["getSingle"]
  update: (p: TParams["budgets"]["update"]) => TResponses["budgets"]["update"]
  delete: (p: TParams["budgets"]["delete"]) => TResponses["budgets"]["delete"]
}

export const apiBudgets: TApi["budgets"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
}
