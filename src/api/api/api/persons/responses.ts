import { TUser } from "../../../../utils/@types/data/user"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Persons = {
  persons: {
    listAll: Promise<TDefaultRes<TDefaultList<TUser>>>
    create: Promise<TDefaultRes<{}>>
    getSingle: Promise<TDefaultRes<TUser>>
    getSelfData: Promise<TDefaultRes<TUser>>
    update: Promise<TDefaultRes<TUser>>
    delete: Promise<TDefaultRes<{}>>
    getByRole: Promise<TDefaultRes<TDefaultList<TUser>>>
    getAllBranches: Promise<TDefaultRes<TDefaultList<TUser>>>

    getBranchUsers: Promise<TDefaultRes<TDefaultList<TUser>>>
    getFranchiseUsers: Promise<TDefaultRes<TDefaultList<TUser>>>
  }
}
