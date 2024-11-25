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

const CategoriesPage = () => {
  const navigate = useNavigate()

  const { user, controllers } = getStore()

  const [categories, setCategories] = useState<TCategory[]>([])

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    creator: "",
  })
  const [options] = useState({
    creator: [
      { key: "1", value: "Fulano Silva" },
      { key: "2", value: "Ambrosio Vasconcelos" },
      { key: "3", value: "Marta Pereira" },
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

  const loadData = useCallback(async () => {
    try {
      const req = await Api.categories.listAll({})

      if (req.ok) {
        setCategories(req.data.content)
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
        data={categories.map((i) => ({
          ...i,
          subcategories: [],
          creator: {
            id: user?.id,
            name: user?.name,
            role: user?.profile,
          },
        }))}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default CategoriesPage
