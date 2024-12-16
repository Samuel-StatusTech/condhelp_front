import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Budgets as TParams } from "./params"
import { TApi_Responses_Budgets as TResponses } from "./responses"

const baseURL = "/budgets"

const listAll: TApi["budgets"]["listAll"] = async (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL

      await service
        .get(`${url}`, {
          params: {
            userId: filters.managerId,
            condominiumId:
              filters.condominiumId !== 0 ? filters.condominiumId : undefined,
            subsidiaryId: filters.branchId,
            page: filters.page,
            size: filters.size,
            sort: filters.sort,
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

const listProviderBudgets: TApi["budgets"]["listProviderBudgets"] = async (
  filters
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${baseURL}/provider/${filters.providerId}`

      await service
        .get(`${url}`, {
          params: {
            userId: filters.managerId,
            condominiumId: filters.condominiumId,
            subsidiaryId: filters.branchId,
            page: filters.page,
            size: filters.size,
            sort: filters.sort,
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
        .post(`${baseURL}`, {
          ...newBudget,
          franqId: 3,
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

const interact: TApi["budgets"]["interact"] = async ({
  budgetId,
  providerId,
  status,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let statusStr = status.toLowerCase()

      await service
        .put(`/providers/${providerId}/budgets/${budgetId}?status=${statusStr}`)
        .then((res) => {
          if (res.status === 200) resolve({ ok: true, data: {} })
          else {
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

const statistics: TApi["budgets"]["statistics"] = async ({ providerId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`/budgets/provider/${providerId}/statistics`)
        .then((res) => {
          const info = res.data

          if (info)
            resolve({
              ok: true,
              data: info,
            })
          else {
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
const getByStatus: TApi["budgets"]["getByStatus"] = async ({
  providerId,
  status,
  page,
  size,
  sort,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${baseURL}/provider/${providerId}`

      await service
        .get(`${url}`, {
          params: {
            status: status,
            page: page,
            size: size,
            sort: sort,
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

export type TApi_Budgets = {
  listAll: (
    p: TParams["budgets"]["listAll"]
  ) => TResponses["budgets"]["listAll"]
  listProviderBudgets: (
    p: TParams["budgets"]["listProviderBudgets"]
  ) => TResponses["budgets"]["listProviderBudgets"]
  create: (p: TParams["budgets"]["create"]) => TResponses["budgets"]["create"]
  getSingle: (
    p: TParams["budgets"]["getSingle"]
  ) => TResponses["budgets"]["getSingle"]
  update: (p: TParams["budgets"]["update"]) => TResponses["budgets"]["update"]
  delete: (p: TParams["budgets"]["delete"]) => TResponses["budgets"]["delete"]
  interact: (
    p: TParams["budgets"]["interact"]
  ) => TResponses["budgets"]["interact"]
  statistics: (
    p: TParams["budgets"]["statistics"]
  ) => TResponses["budgets"]["statistics"]
  getByStatus: (
    p: TParams["budgets"]["getByStatus"]
  ) => TResponses["budgets"]["getByStatus"]
}

export const apiBudgets: TApi["budgets"] = {
  listAll: listAll,
  listProviderBudgets: listProviderBudgets,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
  interact: interact,
  statistics: statistics,
  getByStatus: getByStatus,
}
