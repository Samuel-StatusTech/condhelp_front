import { useCallback, useEffect, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import SearchBlock from "../../components/SearchBlock"
import { TFaq } from "../../utils/@types/data/faq"
import { Api } from "../../api"
import { getStore } from "../../store"
import initials from "../../utils/initials"
import { TDefaultFilters } from "../../api/types/params"
import { matchSearch } from "../../utils/tb/helpers/matchSearch"

const FaqsPage = () => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const [faqs, setFaqs] = useState<TFaq[]>([])

  /*
   *  Search control
   */

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")

  const [searchControl, setSearchControl] = useState(initials.pagination)

  const [searchFilters, setSearchFilters] = useState<TDefaultFilters>({
    page: initials.pagination.pageable.pageNumber,
    size: initials.pagination.size,
    sort: undefined,
  })

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
        const req = await Api.faqs.listAll(params)

        if (req.ok) {
          setSearchControl(req.data)
          setFaqs(req.data.content)
        } else {
          controllers.feedback.setData({
            visible: true,
            state: "alert",
            message: req.error,
          })
        }

        setLoading(false)
      } catch (error) {
        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message:
            "Houve um erro ao carregar as informações. Tente novamente mais tarde.",
        })

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
      <PageHeader type={"table"} from={"faqs"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquise por título ou perfil de acesso"}
        onSearchChange={setSearch}
        onSearch={handleSearch}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.faqs}
        searchData={searchControl}
        setSearchFilters={setSearchFilters}
        data={faqs.filter((i) => {
          const fields = [i.title, ...i.accessProfiles]

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

export default FaqsPage
