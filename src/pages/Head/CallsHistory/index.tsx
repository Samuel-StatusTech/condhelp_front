import { useCallback, useEffect, useState } from "react"
import * as C from "./styled"

import { useNavigate } from "react-router-dom"

import { getStore } from "../../../store"

import { Api } from "../../../api"
import { TCall } from "../../../utils/@types/data/call"
import Table from "../../../components/Table"
import { tableConfig } from "../../../utils/system/table"
import SearchBlock from "../../../components/SearchBlock"
import { TOption } from "../../../utils/@types/data/option"
import { TFilter } from "../../../utils/@types/components/SearchBlock"
import Button from "../../../components/Button"
import { Icons } from "../../../assets/icons/icons"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { TCategory } from "../../../utils/@types/data/category"
import { TSubCategory } from "../../../utils/@types/data/category/subcategories"
import { matchSearch } from "../../../utils/tb/helpers/matchSearch"

const CallsHistory = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)
  const [calls, setCalls] = useState<TCall[]>([])
  const [search, setSearch] = useState("")

  const [categories, setCategories] = useState<
    TSubCategory["serviceCategory"][]
  >([])

  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    category: [],
    subcategory: [],
  })

  const [filters, setFilters] = useState({
    category: "all",
    subcategory: "all",
  })

  const handlePickItem = async (item: TCall) => {
    setLoading(true)

    try {
      // const callDetailsReq = await Api.monitoring.getSingle({ id: item.id })
      // if (callDetailsReq.ok) {
      // const details = callDetailsReq.data
      controllers.modal.open({
        role: "contactInfo",
        visible: true,
        data: {
          idRegister: item.id,
          openingDate: item.opendAt,
          categoryName: item.categoryName,
          description: item.description,
          subCategoryName: item.subCategoryName ?? "-",
          budgetId: item.budgetId ?? 0,
        },
        width: "md",
        handleOp: () => {
          window.location.reload()
        },
      })
      // }
    } catch (error) {}

    setLoading(false)
  }

  const handleBack = () => {
    navigate(-1)
  }

  const onSearch = async () => {
    let params: any = {}

    if (filters.category && filters.category !== "all")
      params.categoryId = filters.category
    if (filters.subcategory && filters.subcategory !== "all")
      params.subcategoryId = filters.subcategory

    loadData(params)
  }

  // Category
  useEffect(() => {
    if (filters.category && filters.category !== "all") {
      const categoryData = categories.find(
        (c) => c.name === filters.category
      ) as TCategory

      setFilters((f) => ({ ...f, subcategory: "all" }))

      setOptions((opts: any) => ({
        ...opts,
        subcategory: [
          { key: "all", value: "Todas" },
          ...parseOptionList(categoryData.serviceSubcategories, "name", "name"),
        ],
      }))
    } else {
      if (filters.category === "all") {
        setFilters((f) => ({ ...f, subcategory: "all" }))

        setOptions((opts: any) => ({
          ...opts,
          subcategory: [],
        }))
      }
    }
  }, [categories, filters.category])

  const loadData = useCallback(
    async (params?: { categoryId?: number; subcategoryId?: number }) => {
      setLoading(true)

      try {
        await Api.monitoring.callsHistory({}).then((res) => {
          if (res.ok) {
            setCalls(res.data.sort((a, b) => (a.id > b.id ? -1 : 1)))
          } else {
            controllers.feedback.setData({
              message:
                "Houve um erro ao carregar informações. Tente novamente mais tarde.",
              state: "error",
              visible: true,
            })
            navigate(-1)
          }
        })

        // Categories and subcategories filters
        const filtersReq = await Api.categories.listAll({ size: 300 })

        if (filtersReq.ok) {
          setCategories(filtersReq.data.content)

          const newOptions = {
            category: [
              { key: "all", value: "Todas" },
              ...parseOptionList(filtersReq.data.content, "name", "name"),
            ],
            subcategory: [],
          }

          setOptions(newOptions)
        } else throw new Error()
      } catch (error) {
        controllers.feedback.setData({
          message: "Não foi possível carregar as informações.",
          state: "error",
          visible: true,
        })
      }

      setLoading(false)
    },
    [controllers.feedback, navigate]
  )

  useEffect(() => {
    // ...
    loadData()
  }, [loadData])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  const handleFilter = (filter: Partial<TFilter>) => {
    setFilters((fltrs) => ({
      ...fltrs,
      [filter.name as string]: filter.value,
    }))
  }

  return (
    <C.Content>
      {/* Page Header */}

      <C.PageHeader>
        <C.PageHead>
          <C.PageTitle>Histórico de chamados</C.PageTitle>

          <Button
            type="quaternary"
            action={handleBack}
            text="Voltar"
            icon={<Icons.Back />}
            iconLeft={true}
            fit={true}
            k={2}
          />
        </C.PageHead>

        <SearchBlock
          search={search}
          onSearchChange={setSearch}
          filters={[
            {
              label: "Categoria",
              name: "category",
              options: options.category,
              value: filters.category,
            },
            {
              label: "Subcategoria",
              name: "subcategory",
              options: options.subcategory,
              value: filters.subcategory,
            },
          ]}
          onFilterChange={handleFilter}
          searchPlaceholder="Pesquise por número do orçamento, título e condomínio..."
          onSearch={onSearch}
        />
      </C.PageHeader>

      <Table
        data={calls.filter((i) => {
          let ok = true

          const fields = [String(i.budgetId), i.budgetTitle, i.condominiumName]

          const searchOk = !!search
            ? fields.some((val) => matchSearch(val, search))
            : true

          const categoryOk =
            !!filters.category && filters.category !== "all"
              ? i.categoryName === filters.category
              : true

          ok = searchOk && categoryOk

          return ok
        })}
        config={tableConfig.calls}
        actions={{ seeMore: handlePickItem }}
      />
    </C.Content>
  )
}

export default CallsHistory
