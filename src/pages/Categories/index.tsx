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
import { TUser } from "../../utils/@types/data/user"
import { parseOptionList } from "../../utils/tb/parsers/parseOptionList"
import { TOption } from "../../utils/@types/data/option"

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

  const getCreators = async (creatorsIds: number[]) => {
    try {
      let creatorsList: TUser[] = []

      let proms: Promise<any>[] = []

      creatorsIds.forEach((c) => {
        proms.push(
          new Promise(async (resolve) => {
            const req = await Api.persons.getSingle({ id: c })

            if (req.ok) creatorsList.push(req.data)

            resolve(true)
          })
        )
      })

      await Promise.all(proms)

      setOptions((opts) => ({
        ...opts,
        creator: parseOptionList(creatorsList, "userId", "name"),
      }))
    } catch (error) {
      // TODO: show error
    }
  }

  // Start component

  const loadData = useCallback(async () => {
    try {
      const req = await Api.categories.listAll({})

      if (req.ok) {
        setCategories(req.data.content)

        const creatorsIds = req.data.content.map((c) => c.userAccountId)

        getCreators(creatorsIds)
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
        data={categories
          .filter((i) => {
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
                ? i.creator.id === filters.creator
                : true

            ok = searchOk && creatorOk

            return ok
          })
          .map((i) => ({
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
