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

const FaqsPage = () => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const [faqs, setFaqs] = useState<TFaq[]>([])

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

  const loadData = useCallback(async () => {
    try {
      const req = await Api.faqs.listAll({})

      if (req.ok) {
        setFaqs(req.data.content)
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: req.error,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "alert",
        message: "Houve um erro ao carregar as informações. Tente novamente mais tarde.",
      })
    }
  }, [controllers.feedback])

  useEffect(() => {
    loadData()
  }, [loadData])

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
        data={faqs}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default FaqsPage
