import { useCallback, useEffect, useState } from "react"
import * as C from "./styled"

import { useNavigate } from "react-router-dom"

import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"

import { Api } from "../../../api"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { TCall } from "../../../utils/@types/data/call"
import Table from "../../../components/Table"
import { tableConfig } from "../../../utils/system/table"

const CallsHistory = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [calls] = useState<TCall[]>([])

  const [, setOptions] = useState<{ [key: string]: TOption[] }>({
    country: [],
    state: [],
  })

  const handlePickItem = (id: number) => {
    const call = calls.find((c) => c.id === id)
    console.log(call)
  }

  const loadData = useCallback(async () => {
    try {
      await Api.countries.listAll({}).then((res) => {
        if (res.ok) {
          setOptions((opts) => ({
            ...opts,
            country: parseOptionList(res.data.content, "id", "name"),
          }))
        } else {
          controllers.feedback.setData({
            message:
              "Houve um erro ao carregar informações para cadastro. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
          navigate(-1)
        }
      })
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações da região.",
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
