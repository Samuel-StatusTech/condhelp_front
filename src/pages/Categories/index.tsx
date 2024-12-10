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

const CategoriesPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(true)

  const [categories, setCategories] = useState<TCategory[]>([])

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")
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

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.categories.listAll({ size: 300 })

      if (req.ok) {
        setCategories(req.data.content)

        const creatorsList = req.data.content.map((c) => c.user)

        setOptions((opts) => ({
          ...opts,
          creator: [
            { key: "all", value: "Todos" },
            ...parseOptionList(creatorsList, "id", "name"),
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
  }, [controllers.feedback])

  useEffect(() => {
    loadData()
  }, [loadData])

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
        data={categories.filter((i) => {
          let ok = true

          const searchOk = !!search
            ? [
                i.name,
                (i.serviceSubcategories ?? []).map((sc) => sc.name),
                /*
                 * Creator filter
                 */
                // i.creator.name,
              ]
                .flat()
                .some((val) =>
                  String(val).toLowerCase().includes(search.toLowerCase())
                )
            : true

          const creatorOk =
            !!filters.creator && filters.creator !== "all"
              ? i.user.id === +filters.creator
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
