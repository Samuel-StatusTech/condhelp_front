import { useCallback, useEffect, useState } from "react"
import * as C from "./styled"

import { useNavigate } from "react-router-dom"

import { getStore } from "../../../store"

import { Api } from "../../../api"
import { List } from "../../../components/List"
import { TFaq } from "../../../utils/@types/data/faq"

import PageHeader from "../../../components/PageHeader"

const FaqsView = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [faqs, setFaqs] = useState<TFaq[]>([])

  const loadData = useCallback(async () => {
    try {
      const req = await Api.faqs.listAll({})
      if (req.ok) {
        setFaqs(req.data.content)
      } else {
        controllers.feedback.setData({
          message:
            "Houve um erro ao carregar informações. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações.",
        state: "error",
        visible: true,
      })
      navigate(-1)
    }
  }, [controllers.feedback, navigate])

  useEffect(() => {
    // ...
    loadData()
  }, [loadData])

  return (
    <C.Content className={"falseSubContentWrapper"}>
      <PageHeader
        type="breadcrumb"
        from="faqView"
        forForm={true}
        noBack={true}
      />

      <List.FaqView list={faqs} />
    </C.Content>
  )
}

export default FaqsView
