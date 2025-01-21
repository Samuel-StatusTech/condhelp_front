import { useCallback, useEffect, useState } from "react"
import * as C from "./styled"

import { useNavigate } from "react-router-dom"

import { getStore } from "../../../store"

import { Api } from "../../../api"
import { TCall } from "../../../utils/@types/data/call"
import Table from "../../../components/Table"
import { tableConfig } from "../../../utils/system/table"

const CallsHistory = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [calls, setCalls] = useState<TCall[]>([])

  const handlePickItem = (id: number) => {
    // const call = calls.find((c) => c.id === id)
  }

  const loadData = useCallback(async () => {
    try {
      await Api.monitoring.callsHistory({}).then((res) => {
        if (res.ok) {
          setCalls(res.data)
        } else {
          controllers.feedback.setData({
            message:
              "Houve um erro ao carregar informações. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
          navigate(-1)
        }
      })
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações.",
        state: "error",
        visible: true,
      })
    }
  }, [controllers.feedback, navigate])

  useEffect(() => {
    // ...
    loadData()
  }, [loadData])

  return (
    <C.Content>
      {/* <List.CallsHistory list={calls} /> */}

      <Table
        data={calls}
        config={tableConfig.calls}
        actions={{ edit: handlePickItem }}
      />
    </C.Content>
  )
}

export default CallsHistory
