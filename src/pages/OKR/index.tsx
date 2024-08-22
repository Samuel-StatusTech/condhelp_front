import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./styled"

import Divider from "../../components/_minimals/Divider"
import PageHeader from "../../components/PageHeader"
import Form from "../../components/Form"
import initials from "../../utils/initials"

const OkrPage = () => {
  const navigate = useNavigate()

  const [okr, setOkr] = useState(initials.forms.okr)

  const handleNew = () => {
    navigate("single")
  }

  const handleField = async (field: string, value: any) => {
    setOkr((o) => ({ ...o, [field]: value }))
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"goals"} action={handleNew} />
      <Divider />

      {/* Table content */}
      <Form
        handleCancel={handleCancel}
        handleField={handleField}
        handleSave={handleSave}
        groups={[
          {
            groupInfo: {
              name: "Cadastro de OKR",
              description: [
                "Descreva sua OKR que deverá ser aprovada pelo líder",
              ],
            },
            fields: [
              {
                field: "description",
                type: "textarea",
                label: "Sua OKR",
                value: okr.description,
              },
            ],
          },
        ]}
      />
    </S.Content>
  )
}

export default OkrPage
