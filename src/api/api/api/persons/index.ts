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
  FILIAL: "/subsidiaries",
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
      const userAccountRegister = await service.post(`${baseURL}`, {
        userId: newPerson.userId,
        photo: newPerson.photo,
        name: newPerson.name,
        email: newPerson.email,
        profile: newPerson.profile,
        status: newPerson.status,
      })

      if (userAccountRegister.data) {
        const roleUrl = rolesUrlRelations[newPerson.profile]

        await service
          .post(`${roleUrl}`, {
            ...newPerson,
            id: newPerson.userId
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
      } else {
        resolve({
          ok: false,
          error:
            "Não foi possível criar o usuário. Tente novamente mais tarde.",
        })
      }
    } catch (error) {
      reject({
        error: "Não foi possível criar o usuário. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["persons"]["update"] = async ({
  person,
  originalPersonType,
}) => {
  return new Promise(async (resolve) => {
    try {
      const roleUrl = rolesUrlRelations[originalPersonType]

      await service
        .put(`${roleUrl}/${person.id}`, person)
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
      resolve({
        ok: false,
        error:
          "Não foi possível atualizar o usuário. Tente novamente mais tarde.",
      })
    }
  })
}

const deleteItem: TApi["persons"]["delete"] = async ({ person }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const roleUrl = rolesUrlRelations[person.profile]

      await service
        .delete(`${roleUrl}/${person.id}`)
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

            if (userProfile !== "ADMIN") {
              const extraDataReq = await service.get(
                `${rolesUrlRelations[userProfile] ?? baseURL}/${info.id}`
              )

              if (extraDataReq.data) {
                resolve({
                  ok: true,
                  data: extraDataReq.data,
                })
              } else throw new Error()
            } else {
              resolve({
                ok: true,
                data: info,
              })
            }
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

const getSelfData: TApi["persons"]["getSelfData"] = async ({ id }) => {
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

const getByRole: TApi["persons"]["getByRole"] = async ({ role }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const roleUrl = rolesUrlRelations[role]

      if (roleUrl) {
        await service
          .get(`${roleUrl}`)
          .then(async (res) => {
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
      } else {
        await service
          .get(`${baseURL}`, {
            params: {
              size: 1000
            }
          })
          .then(async (res) => {
            const info = res.data

            if (info) {
              resolve({
                ok: true,
                data: {
                  ...info,
                  content: info.content.filter((i: any) => i.profile === role),
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
      }
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
  getSelfData: (
    p: TParams["persons"]["getSelfData"]
  ) => TResponses["persons"]["getSelfData"]
  update: (p: TParams["persons"]["update"]) => TResponses["persons"]["update"]
  delete: (p: TParams["persons"]["delete"]) => TResponses["persons"]["delete"]
  getByRole: (
    p: TParams["persons"]["getByRole"]
  ) => TResponses["persons"]["getByRole"]
}

export const apiPersons: TApi["persons"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  getSelfData: getSelfData,
  update: update,
  delete: deleteItem,
  getByRole: getByRole,
}
