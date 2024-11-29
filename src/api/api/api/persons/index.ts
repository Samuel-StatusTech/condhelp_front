import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Persons as TParams } from "./params"
import { TApi_Responses_Persons as TResponses } from "./responses"
import { TAccess } from "../../../../utils/@types/data/access"

const baseURL = "/user-accounts"

const rolesUrlRelations: { [key in TAccess]: string } = {
  SINDICO: "/managers",
  ADMIN: "",
  USUARIO: "",
  MATRIZ: "",
  PRESTADOR: "",
  FILIAL: "",
  MONITOR: "",
  FRANQUEADO: "",
  CONDOMINIO: "",
}

const listAll: TApi["persons"]["listAll"] = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}`, data)
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
                "Não foi possível listar os usuários. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível listar os usuários. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível listar os usuários. Tente novamente mais tarde.",
      })
    }
  })
}

const create: TApi["persons"]["create"] = async ({ newPerson }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // User data register

      const roleUrl = rolesUrlRelations[newPerson.profile]

      await service
        .post(`${roleUrl}`, newPerson)
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
                "Não foi possível criar o usuário. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível criar o usuário. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error: "Não foi possível criar o usuário. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["persons"]["update"] = async ({ person }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let roleUrl = ""

      switch (person.profile) {
        case "SINDICO":
          roleUrl = "/managers"
          break
        default:
          break
      }

      await service
        .put(`${baseURL}${roleUrl}/${person.id}`, person)
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
                "Não foi possível atualizar o usuário. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar o usuário. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível atualizar o usuário. Tente novamente mais tarde.",
      })
    }
  })
}

const deleteItem: TApi["persons"]["delete"] = async ({ id }) => {
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
                "Não foi possível excluir o usuário. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível excluir o usuário. Tente novamente mais tarde.",
          })
        })
    } catch (error) {
      reject({
        error:
          "Não foi possível excluir o usuário. Tente novamente mais tarde.",
      })
    }
  })
}

const getSingle: TApi["persons"]["getSingle"] = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/${id}`)
        .then(async (res) => {
          const info = res.data

          if (info) {
            const userProfile = info.profile as TAccess

            const extraDataReq = await service.get(
              `${rolesUrlRelations[userProfile]}/${info.id}`
            )

            if (extraDataReq.data) {
              resolve({
                ok: true,
                data: extraDataReq.data,
              })
            } else throw new Error()
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

export type TApi_Persons = {
  listAll: (
    p: TParams["persons"]["listAll"]
  ) => TResponses["persons"]["listAll"]
  create: (p: TParams["persons"]["create"]) => TResponses["persons"]["create"]
  getSingle: (
    p: TParams["persons"]["getSingle"]
  ) => TResponses["persons"]["getSingle"]
  update: (p: TParams["persons"]["update"]) => TResponses["persons"]["update"]
  delete: (p: TParams["persons"]["delete"]) => TResponses["persons"]["delete"]
}

export const apiPersons: TApi["persons"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  update: update,
  delete: deleteItem,
}
