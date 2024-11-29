import { useCallback, useEffect, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import { systemOptions } from "../../utils/system/options"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import SearchBlock from "../../components/SearchBlock"
import { getStore } from "../../store"
import { Api } from "../../api"

const CondosPage = () => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const [condos, setCondos] = useState(fdata.condos)
  const [search, setSearch] = useState("")

  const [filters, setFilters] = useState({
    states: "",
  })
  const [options] = useState({
    states: systemOptions.states,
  })

  const handleNew = useCallback(() => {
    navigate("single")
  }, [navigate])

  const handleEdit = (id: string) => {
    navigate(`single/${id}`)
  }

  const handleFilters = (filter: Partial<TFilter>) => {
    setFilters((filtersList) => ({
      ...filtersList,
      [filter.name as string]: filter.value,
    }))
  }

  const handleSearch = async () => {}

  // Start component

  const loadData = useCallback(async () => {
    try {
      const req = await Api.condos.listAll({})

      if (req.ok) {
        setCondos(req.data.content)
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
      <PageHeader type={"table"} from={"condos"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquisar condomínios por nome, cidade, síndico..."}
        onSearchChange={setSearch}
        onFilterChange={handleFilters}
        onSearch={handleSearch}
        filters={[
          {
            label: "Estado",
            name: "states",
            options: options.states,
            value: filters.states,
            byKey: true,
          },
        ]}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.condos}
        data={condos}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default CondosPage
