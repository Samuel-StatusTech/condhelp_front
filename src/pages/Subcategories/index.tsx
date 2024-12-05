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

const SubcategoriesPage = () => {
  const navigate = useNavigate()

  const { user, controllers } = getStore()

  const [subcategories, setSubcategories] = useState<TSubCategory[]>([])

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    creator: "",
  })
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    category: [],
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
      const catReq = await Api.categories.listAll({ size: 300 })

      if (catReq.ok) {
        setOptions((opts) => ({
          ...opts,
          category: parseOptionList(catReq.data.content, "id", "name"),
        }))
      }

      const req = await Api.subcategories.listAll({})

      if (req.ok) {
        setSubcategories(req.data.content)
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
            name: "category",
            options: options.category,
            value: filters.category,
          },
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
        config={tableConfig.subcategories}
        data={subcategories.map((i) => ({
          ...i,
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

export default SubcategoriesPage
