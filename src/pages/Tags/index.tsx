import { useCallback, useEffect, useState } from "react"
import * as S from "./styled"
import { getStore } from "../../store"
import { Api } from "../../api"

import { tableConfig } from "../../utils/system/table"
import { TFilter } from "../../utils/@types/components/SearchBlock"

import { useNavigate } from "react-router-dom"

import Divider from "../../components/_minimals/Divider"
import Table from "../../components/Table"
import PageHeader from "../../components/PageHeader"
import SearchBlock from "../../components/SearchBlock"

import { TOption } from "../../utils/@types/data/option"
import initials from "../../utils/initials"
import { TDefaultFilters } from "../../api/types/params"
import { matchSearch } from "../../utils/tb/helpers/matchSearch"
import { TTag } from "../../utils/@types/data/tag"

const TagsPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(true)

  const [tags, setTags] = useState<TTag[]>([])

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")

  const [searchControl, setSearchControl] = useState(initials.pagination)

  const [searchFilters, setSearchFilters] = useState<TDefaultFilters>({
    page: initials.pagination.pageable.pageNumber,
    size: initials.pagination.size,
    sort: undefined,
  })

  const [filters, setFilters] = useState({
    profile: "",
  })
  const [options] = useState<{ [key: string]: TOption[] }>({
    profile: [
      { key: "all", value: "Todos" },
      { key: "SINDICO", value: "Síndico" },
      { key: "PRESTADOR", value: "Prestador" },
    ],
  })

  const handleFilters = (filter: Partial<TFilter>) => {
    setFilters((filtersList) => ({
      ...filtersList,
      [filter.name as string]: filter.value,
    }))
  }

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
        const req = await Api.tags.listAll(params)

        if (req.ok) {
          setSearchControl(req.data)
          setTags(req.data.content)
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
      <PageHeader type={"table"} from={"tags"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquisar categoria"}
        onSearchChange={setSearch}
        onFilterChange={handleFilters}
        onSearch={handleSearch}
        filters={[
          {
            label: "Perfil",
            name: "profile",
            options: options.profile,
            value: filters.profile,
          },
        ]}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.tags}
        searchData={searchControl}
        withoutPagination={true}
        setSearchFilters={setSearchFilters}
        data={tags.filter((i) => {
          let ok = true

          const fields = [i.name]

          const searchOk = !!search
            ? fields.some((val) => matchSearch(val, search))
            : true

          const profileOk =
            !!filters.profile && filters.profile !== "all"
              ? i.type === filters.profile
              : true

          ok = searchOk && profileOk

          return ok
        })}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default TagsPage
