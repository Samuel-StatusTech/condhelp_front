import { TCall } from "../../../../utils/@types/data/call"
import {
  TMonitor,
  TMonitorContact,
  TMonitorItemDetails,
} from "../../../../utils/@types/data/monitoring"
import { TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Monitoring = {
  monitoring: {
    getList: Promise<TDefaultRes<TMonitor>>
    getSingle: Promise<TDefaultRes<TMonitorItemDetails>>
    attendSingle: Promise<TDefaultRes<TMonitor>>
    closeRequest: Promise<TDefaultRes<TMonitor>>
    registerRequest: Promise<TDefaultRes<TMonitorContact>>
    callsHistory: Promise<TDefaultRes<TCall[]>>
  }
}
