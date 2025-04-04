import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Condos as TParams } from "./params"
import { TApi_Responses_Condos as TResponses } from "./responses"

const baseURL = "/condominiums"

const listAll: TApi["condos"]["listAll"] = async (filters) => {
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
          let backMessage =
            "Não foi possível criar o condomínio. Tente novamente mais tarde."

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
          let backMessage =
            "Não foi possível excluir o condomínio. Tente novamente mais tarde."

          if (
            err.response?.status === 409 &&
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
              data: {
                ...info,
                manager: info.manager
                  ? {
                      ...info.manager,
                      managerId: info.manager.id,
                    }
                  : {},
              },
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

const getRejectedList: TApi["condos"]["getRejectedList"] = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/rejected`)
        .then((res) => {
          const info = res.data

          if (res.status === 200) {
            resolve({
              ok: true,
              data: info,
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível listar os condomínios no momento. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          let backMessage =
            "Não foi possível listar os condomínios no momento. Tente novamente mais tarde."

          if (err.response && err.response.data) {
            backMessage = (err.response.data as any).error ?? backMessage
          }

          resolve({
            ok: false,
            error: backMessage,
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar os condomínios no momento. Tente novamente mais tarde.",
      })
    }
  })
}

const getWaitingList: TApi["condos"]["getWaitingList"] = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/wating`)
        .then((res) => {
          const info = res.data

          if (res.status === 200) {
            resolve({
              ok: true,
              data: info,
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível listar os condomínios no momento. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          let backMessage =
            "Não foi possível listar os condomínios no momento. Tente novamente mais tarde."

          if (err.response && err.response.data) {
            backMessage = (err.response.data as any).error ?? backMessage
          }

          resolve({
            ok: false,
            error: backMessage,
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar os condomínios no momento. Tente novamente mais tarde.",
      })
    }
  })
}

const rejectItem: TApi["condos"]["reject"] = async ({
  id,
  rejectionReason,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${id}/rejected`, { rejectionReason })
        .then((res) => {
          const info = res.data

          if (res.status === 200) {
            resolve({
              ok: true,
              data: info,
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível recusar o condomínio no momento. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          let backMessage =
            "Não foi possível recusar o condomínio no momento. Tente novamente mais tarde."

          if (err.response && err.response.data) {
            backMessage = (err.response.data as any).error ?? backMessage
          }

          resolve({
            ok: false,
            error: backMessage,
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível recusar o condomínio no momento. Tente novamente mais tarde.",
      })
    }
  })
}

const approveItem: TApi["condos"]["approve"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .put(`${baseURL}/${id}/active`)
        .then((res) => {
          const info = res.data

          if (res.status === 200) {
            resolve({
              ok: true,
              data: info,
            })
          } else {
            resolve({
              ok: false,
              error:
                "Não foi possível aprovar o condomínio no momento. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          let backMessage =
            "Não foi possível aprovar o condomínio no momento. Tente novamente mais tarde."

          if (err.response && err.response.data) {
            backMessage = (err.response.data as any).error ?? backMessage
          }

          resolve({
            ok: false,
            error: backMessage,
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível aprovar o condomínio no momento. Tente novamente mais tarde.",
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
  getWaitingList: (
    p: TParams["condos"]["getWaitingList"]
  ) => TResponses["condos"]["getWaitingList"]
  getRejectedList: (
    p: TParams["condos"]["getRejectedList"]
  ) => TResponses["condos"]["getRejectedList"]
  reject: (p: TParams["condos"]["reject"]) => TResponses["condos"]["reject"]
  approve: (p: TParams["condos"]["approve"]) => TResponses["condos"]["approve"]
}

export const apiCondos: TApi["condos"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
  getWaitingList: getWaitingList,
  getRejectedList: getRejectedList,
  reject: rejectItem,
  approve: approveItem,
}
