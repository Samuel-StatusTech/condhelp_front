import { TDashboardAdmin } from "../../../../utils/@types/data/dashboards/admin"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Dashboards = {
  dashboards: {
    admin: Promise<TDefaultRes<TDashboardAdmin>>
  }
}
