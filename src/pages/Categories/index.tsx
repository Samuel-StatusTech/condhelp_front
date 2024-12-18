import { useCallback, useEffect, useState } from "react"
import * as S from "./styled"
import { getStore } from "../../store"
import { Api } from "../../api"

import { tableConfig } from "../../utils/system/table"
import { TCategory } from "../../utils/@types/data/category"
import { TFilter } from "../../utils/@types/components/SearchBlock"

import { useNavigate } from "react-router-dom"

import Divider from "../../components/_minimals/Divider"
import Table from "../../components/Table"
import PageHeader from "../../components/PageHeader"
import SearchBlock from "../../components/SearchBlock"

import { parseOptionList } from "../../utils/tb/parsers/parseOptionList"
import { TOption } from "../../utils/@types/data/option"
import { sorts } from "../../utils/tb/parsers/sort"
import initials from "../../utils/initials"
import { TDefaultFilters } from "../../api/types/params"
import { matchSearch } from "../../utils/tb/helpers/matchSearch"

const CategoriesPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(true)

  const [categories, setCategories] = useState<TCategory[]>([])

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
    creator: "",
  })
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    creator: [],
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
        const req = await Api.categories.listAll(params)

        if (req.ok) {
          setSearchControl(req.data)
          setCategories(req.data.content)

          let makers: TCategory["user"][] = []

          req.data.content.forEach((c) => {
            const makersIds = makers.map((i) => i.userId)

            if (!makersIds.includes(c.user.userId)) makers.push(c.user)
          })

          setOptions((opts) => ({
            ...opts,
            creator: [
              { key: "all", value: "Todos" },
              ...parseOptionList(
                sorts.alphabetically(makers, "name"),
                "userId",
                "name"
              ),
            ],
          }))
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
      <PageHeader type={"table"} from={"categories"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquisar categoria"}
        onSearchChange={setSearch}
        onFilterChange={handleFilters}
        onSearch={handleSearch}
        filters={[
          {
            label: "Criada por",
            name: "creator",
            options: options.creator,
            value: filters.creator,
          },
        ]}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.categories}
        searchData={searchControl}
        setSearchFilters={setSearchFilters}
        data={categories.filter((i) => {
          let ok = true

          const fields = [
            i.name,
            ...(i.serviceSubcategories ?? []).map((sc) => sc.name),
            i.user.name,
          ]

          const searchOk = !!search
            ? fields.some((val) => matchSearch(val, search))
            : true

          const creatorOk =
            !!filters.creator && filters.creator !== "all"
              ? i.user.userId === +filters.creator
              : true

          ok = searchOk && creatorOk

          return ok
        })}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default CategoriesPage
