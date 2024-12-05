import { useCallback, useEffect, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"

import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import SearchBlock from "../../components/SearchBlock"
import { getStore } from "../../store"
import { Api } from "../../api"
import { TRegion } from "../../utils/@types/data/region"

const RegionsPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [regions, setRegions] = useState<TRegion[]>([])

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")

  const handleSearch = async () => {}

  // Engine

  const handleNew = useCallback(() => {
    navigate("single")
  }, [navigate])

  const handleEdit = (id: string) => {
    navigate(`single/${id}`)
  }

  // Start component

  const loadData = useCallback(async () => {
    try {
      const req = await Api.regions.listAll({ size: 300 })

      if (req.ok) {
        setRegions(req.data.content)
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: req.error,
        })
      }
    } catch (error) {
      // ...
    }
  }, [controllers.feedback])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <PageHeader type={"table"} from={"regions"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquise por Nome, País ou Estado"}
        onSearchChange={setSearch}
        onSearch={handleSearch}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.regions}
        data={regions}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default RegionsPage
