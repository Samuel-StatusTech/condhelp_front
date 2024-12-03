import { Api } from "../../../api"
import { TStore } from "../../@types/store"

type Props = {
    userId?: number
    controllers: TStore["controllers"]
}

export const updateSelfInfo = async ({userId, controllers}: Props) => {
    try {
        const req = await Api.persons.getSelfData({ id: userId as number })

        if (req.ok) {
            controllers.user.setData(req.data)
        }
    } catch (error) {
        console.error(error)
    }
}