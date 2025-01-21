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

  const [loading, setLoading] = useState(false)
  const [calls, setCalls] = useState<TCall[]>([])

  const handlePickItem = async (item: TCall) => {
    // setLoading(true)

    // try {
    //   const callDetailsReq = await Api.monitoring.getSingle({ id: item.id })

    //   if (callDetailsReq.ok) {
    //     const details = callDetailsReq.data
        
    //     controllers.modal.open({
    //       role: "contactInfo",
    //       visible: true,
    //       data: {
    //         ...details,
    //         subCategoryName: details.subCategoryName,
    //         budgetId: details.budgetId,
    //         providerId: item.,
    //       },
    //       width: "sm",
    //       handleOp: onUpdateContact,
    //     })
    //   }
    // } catch (error) {
      
    // }
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      await Api.monitoring.callsHistory({}).then((res) => {
        if (res.ok) {
          setCalls(res.data.sort((a, b) => (a.id > b.id ? -1 : 1)))
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

    setLoading(false)
  }, [controllers.feedback, navigate])

  useEffect(() => {
    // ...
    loadData()
  }, [loadData])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

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
