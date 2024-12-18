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
import { TDefaultFilters } from "../../api/types/params"
import initials from "../../utils/initials"
import { matchSearch } from "../../utils/tb/helpers/matchSearch"

const RegionsPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [regions, setRegions] = useState<TRegion[]>([])

  const [loading, setLoading] = useState(true)

  const [searchControl, setSearchControl] = useState(initials.pagination)

  const [searchFilters, setSearchFilters] = useState<TDefaultFilters>({
    page: initials.pagination.pageable.pageNumber,
    size: initials.pagination.size,
    sort: undefined,
  })

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

  const loadData = useCallback(
    async (params: TDefaultFilters) => {
      setLoading(true)

      try {
        const req = await Api.regions.listAll(params)

        if (req.ok) {
          setSearchControl(req.data)
          setRegions(req.data.content)
        } else {
          controllers.feedback.setData({
            visible: true,
            state: "alert",
            message: req.error,
          })
        }

        setLoading(false)
      } catch (error) {
        // ...
        setLoading(false)
      }
    },
    [controllers.feedback]
  )

  useEffect(() => {
    loadData(searchFilters)
  }, [loadData, searchFilters])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

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
        searchData={searchControl}
        setSearchFilters={setSearchFilters}
        data={regions.filter((i) => {
          const fields = [i.name, i.country.name, i.state.name]

          let ok = !!search
            ? fields.some((val) => matchSearch(val, search))
            : true

          return ok
        })}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default RegionsPage
