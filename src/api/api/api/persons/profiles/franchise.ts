import { AxiosError } from "axios"
import { rolesUrlRelations } from ".."
import { service } from "../../../.."
import { TApi } from "../../../../types"

const baseURL = "/user-accounts"

const create: TApi["persons"]["create"] = async ({ newPerson }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Other profile
      if (!["SINDICO"].includes(newPerson.profile)) {
        const userAccountRegister = await service.post(`${baseURL}`, {
          id: newPerson.userId,
          userId: newPerson.userId,
          photo: newPerson.photo,
          name: newPerson.name,
          email: newPerson.email,
          profile: newPerson.profile,
          status: newPerson.status,
        })

        if (!userAccountRegister.data) {
          resolve({
            ok: false,
            error:
              "Não foi possível criar o usuário. Tente novamente mais tarde.",
          })

          return
        }

        if (["ADMIN", "FRANQUEADO"].includes(newPerson.profile)) {
          resolve({
            ok: true,
            data: userAccountRegister.data,
          })

          return
        }
      }

      // Manager start here
      const roleUrl = rolesUrlRelations[newPerson.profile]

      await service
        .post(`${roleUrl}`, {
          ...newPerson,
          id: newPerson.userId,
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
    } catch (error) {
      reject({
        error: "Não foi possível criar o usuário. Tente novamente mais tarde.",
      })
    }
  })
}

export const franchiseApi = {
  create,
}
