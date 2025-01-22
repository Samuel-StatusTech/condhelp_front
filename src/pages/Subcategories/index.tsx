import { useCallback, useEffect, useState } from "react"
import * as S from "./styled"
import { getStore } from "../../store"
import { Api } from "../../api"

import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import { TSubCategory } from "../../utils/@types/data/category/subcategories"

import Divider from "../../components/_minimals/Divider"
import Table from "../../components/Table"
import PageHeader from "../../components/PageHeader"
import SearchBlock from "../../components/SearchBlock"
import { parseOptionList } from "../../utils/tb/parsers/parseOptionList"
import { TOption } from "../../utils/@types/data/option"
import { TDefaultFilters } from "../../api/types/params"
import initials from "../../utils/initials"
import { matchSearch } from "../../utils/tb/helpers/matchSearch"

const SubcategoriesPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [subcategories, setSubcategories] = useState<TSubCategory[]>([])

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
  const [filters, setFilters] = useState({
    serviceCategory: "",
    creator: "",
  })
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    serviceCategory: [],
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
    async (searchParams: TDefaultFilters) => {
      setLoading(true)

      try {
        const req = await Api.subcategories.listAll(searchParams)

        if (req.ok) {
          setSearchControl(req.data)

          let cats: TSubCategory["serviceCategory"][] = []
          let makers: TSubCategory["user"][] = []

          req.data.content.forEach((sc) => {
            const catsIds = cats.map((i) => i.id)
            const makersIds = makers.map((i) => i.userId)

            if (!catsIds.includes(sc.serviceCategory.id))
              cats.push(sc.serviceCategory)
            if (!makersIds.includes(sc.user.userId)) makers.push(sc.user)
          })

          setOptions((opts) => ({
            ...opts,
            serviceCategory: [
              { key: "all", value: "Todas" },
              ...parseOptionList(
                cats.sort((a, b) =>
                  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                ),
                "id",
                "name"
              ),
            ],
            creator: [
              { key: "all", value: "Todos" },
              ...parseOptionList(
                makers.sort((a, b) =>
                  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                ),
                "userId",
                "name"
              ),
            ],
          }))

          setSubcategories(req.data.content)
        } else {
          controllers.feedback.setData({
            visible: true,
            state: "alert",
            message: req.error,
          })
        }

        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    },
    [controllers.feedback]
  )

  useEffect(() => {
    loadData({
      ...searchFilters,
      sort: "name,asc",
    })
  }, [loadData, searchFilters])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <S.Content>
      <PageHeader type={"table"} from={"subcategories"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquisar subcategoria"}
        onSearchChange={setSearch}
        onFilterChange={handleFilters}
        onSearch={handleSearch}
        filters={[
          {
            label: "Categoria",
            name: "serviceCategory",
            options: options.serviceCategory,
            value: filters.serviceCategory,
          },
        ]}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.subcategories}
        searchData={searchControl}
        setSearchFilters={setSearchFilters}
        data={subcategories.filter((i) => {
          let ok = false

          let searchOk = true
          let categoryOk = true
          let creatorOk = true

          if (!!search) {
            searchOk = [i.name, i.serviceCategory.name, i.user.name].some(
              (val) => matchSearch(val, search)
            )
          }

          if (filters.serviceCategory && filters.serviceCategory !== "all") {
            categoryOk = i.serviceCategory.id === +filters.serviceCategory
          }

          if (filters.creator && filters.creator !== "all") {
            creatorOk = i.user.userId === +filters.creator
          }

          ok = searchOk && categoryOk && creatorOk

          return ok
        })}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default SubcategoriesPage
