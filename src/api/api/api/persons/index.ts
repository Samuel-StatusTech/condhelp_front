import { TApi } from "../../../types"
import { service } from "../../.."
import { AxiosError } from "axios"
import { TApi_Params_Persons as TParams } from "./params"
import { TApi_Responses_Persons as TResponses } from "./responses"
import { TAccess } from "../../../../utils/@types/data/access"
import { parseUserProvider } from "../../../../utils/tb/parsers/api/user/provider"
import { parseUserBranch } from "../../../../utils/tb/parsers/api/user/branch"
import { apiCities } from "../cities"
import { TCity } from "../../../../utils/@types/data/region"
import { parseUserFranchise } from "../../../../utils/tb/parsers/api/user/franchise"

const baseURL = "/user-accounts"

export const rolesUrlRelations: { [key in TAccess]: string } = {
  SINDICO: "/managers",
  ADMIN: "",
  USUARIO: "",
  MATRIZ: "",
  PRESTADOR: "/providers",
  FILIAL: "/subsidiaries",
  MONITOR: "",
  FRANQUEADO: "franchisees",
  CONDOMINIO: "",
}

const listAll: TApi["persons"]["listAll"] = async (filters) => {
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
      // Other profile
      if (!["SINDICO"].includes(newPerson.profile)) {
        const userAccountRegister = await service.post(`${baseURL}`, {
          userId: newPerson.userId,
          photo: newPerson.photo,
          name: newPerson.name,
          email: newPerson.email,
          profile: newPerson.profile,
          status: newPerson.status,
          branchId: newPerson.branchId,
          franchiseId: newPerson.franchiseId,
        })

        if (!userAccountRegister.data) {
          resolve({
            ok: false,
            error:
              "Não foi possível criar o usuário. Tente novamente mais tarde.",
          })

          return
        }

        if (["ADMIN"].includes(newPerson.profile)) {
          resolve({
            ok: true,
            data: userAccountRegister.data,
          })

          return
        }
      }

      // Manager start here
      const roleUrl = rolesUrlRelations[newPerson.profile]

      let additionalData: any = {
        ...newPerson,
        id: newPerson.userId,
        status:
          newPerson.profile === "PRESTADOR" ? "AGUARDANDO" : newPerson.status,
      }

      if (newPerson.profile === "FILIAL") {
        additionalData.subsidiaryId = newPerson.userId
        additionalData.userAccountId = newPerson.userId
      }

      await service
        .post(`${roleUrl}`, additionalData)
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
          let backMessage =
            "Não foi possível criar o usuário. Tente novamente mais tarde."

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
        error: "Não foi possível criar o usuário. Tente novamente mais tarde.",
      })
    }
  })
}

const update: TApi["persons"]["update"] = async ({ person }) => {
  return new Promise(async (resolve) => {
    try {
      if (!["SINDICO"].includes(person.profile)) {
        const userAccountRegister = await service.put(
          `${baseURL}/${person.userId}`,
          {
            userId: person.userId,
            photo: person.photo,
            name: person.name,
            email: person.email,
            profile: person.profile,
            status: person.status,
            branchId: person.branchId,
            franchiseId: person.franchiseId,
          }
        )

        if (!userAccountRegister.data) {
          resolve({
            ok: false,
            error:
              "Não foi possível atualizar o usuário. Tente novamente mais tarde.",
          })

          return
        }

        if (["ADMIN"].includes(person.profile)) {
          resolve({
            ok: true,
            data: userAccountRegister.data,
          })

          return
        }

        person.userAccountId = userAccountRegister.data.userId
      }

      const roleUrl = rolesUrlRelations[person.profile]

      const id =
        person.profile === "SINDICO"
          ? person.userId
          : person.profile === "PRESTADOR"
          ? person.id
          : person.profile === "FILIAL"
          ? person.subsidiaryId
          : person.userAccountId

      const parsed =
        person.profile === "PRESTADOR"
          ? { ...person, status: "AGUARDANDO" }
          : JSON.parse(JSON.stringify(person))

      if (parsed.profile === "SINDICO") {
        delete parsed.id
      }

      await service
        .put(`${roleUrl}/${id}`, parsed)
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

const inactivate: TApi["persons"]["inactivate"] = async ({ id }) => {
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
                "Não foi possível desativar o usuário. Tente novamente mais tarde.",
            })
          }
        })
        .catch((err: AxiosError) => {
          resolve({
            ok: false,
            error:
              "Não foi possível desativar o usuário. Tente novamente mais tarde.",
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

const getSingle: TApi["persons"]["getSingle"] = async ({
  id,
  profile = "USUARIO",
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${baseURL}/${id}`)
        .then(async (res) => {
          const info = res.data

          if (info) {
            const userProfile = info.profile as TAccess

            if (!["ADMIN"].includes(userProfile)) {
              const url =
                userProfile === "FILIAL"
                  ? `${rolesUrlRelations[userProfile]}/useraccount`
                  : userProfile === "PRESTADOR"
                  ? `${rolesUrlRelations[userProfile]}/useraccount`
                  : userProfile === "FRANQUEADO"
                  ? `${rolesUrlRelations[userProfile]}/useraccount`
                  : userProfile === "SINDICO"
                  ? `${rolesUrlRelations[userProfile]}`
                  : rolesUrlRelations[userProfile] ?? baseURL

              const extraDataReq = await service.get(`${url}/${info.userId}`)

              if (extraDataReq.data) {
                let extraInfo = extraDataReq.data

                let city: TCity | null = null

                if (
                  extraInfo.address &&
                  extraInfo.address.city &&
                  (["FILIAL", "FRANQUEADO", "PRESTADOR"] as TAccess[]).includes(
                    userProfile
                  )
                ) {
                  const cityReq = await apiCities.getSingle({
                    id: +extraInfo.address.city,
                  })

                  if (cityReq.ok) city = cityReq.data
                }

                if (userProfile === "PRESTADOR") {
                  extraInfo = parseUserProvider({
                    ...info,
                    ...extraDataReq.data,
                    status: info.status,
                  })

                  extraInfo.address.city = city?.name
                  extraInfo.address.cityId = city?.id
                } else if (userProfile === "FILIAL") {
                  extraInfo = parseUserBranch({
                    ...info,
                    ...extraDataReq.data,
                  })
                  
                  extraInfo.address.city = city?.name
                  extraInfo.address.cityId = city?.id
                } else if (userProfile === "FRANQUEADO") {
                  extraInfo = parseUserFranchise({
                    ...info,
                    ...extraDataReq.data,
                  })

                  extraInfo.address.city = city?.name
                  extraInfo.address.cityId = city?.id
                }

                resolve({
                  ok: true,
                  data: {
                    ...info,
                    ...extraInfo,
                  },
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
              size: 1000,
            },
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

const getAllBranches: TApi["persons"]["getAllBranches"] = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${rolesUrlRelations.FILIAL}`)
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
    } catch (error) {
      reject({
        error:
          "Não foi possível carregar as informações. Tente novamente mais tarde.",
      })
    }
  })
}

const getBranchUsers: TApi["persons"]["getBranchUsers"] = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${rolesUrlRelations.FILIAL}/myusers`)
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
    } catch (error) {
      reject({
        error:
          "Não foi possível carregar as informações. Tente novamente mais tarde.",
      })
    }
  })
}

const getFranchiseUsers: TApi["persons"]["getFranchiseUsers"] = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service
        .get(`${rolesUrlRelations.FRANQUEADO}/myusers`)
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
  inactivate: (
    p: TParams["persons"]["inactivate"]
  ) => TResponses["persons"]["inactivate"]
  getByRole: (
    p: TParams["persons"]["getByRole"]
  ) => TResponses["persons"]["getByRole"]
  getAllBranches: (
    p: TParams["persons"]["getAllBranches"]
  ) => TResponses["persons"]["getAllBranches"]

  // Own list
  getBranchUsers: (
    p: TParams["persons"]["getBranchUsers"]
  ) => TResponses["persons"]["getBranchUsers"]
  getFranchiseUsers: (
    p: TParams["persons"]["getFranchiseUsers"]
  ) => TResponses["persons"]["getFranchiseUsers"]
}

export const apiPersons: TApi["persons"] = {
  listAll: listAll,
  create: create,
  getSingle: getSingle,
  getSelfData: getSelfData,
  update: update,
  delete: deleteItem,
  inactivate: inactivate,
  getByRole: getByRole,
  getAllBranches: getAllBranches,

  getBranchUsers: getBranchUsers,
  getFranchiseUsers: getFranchiseUsers,
}
