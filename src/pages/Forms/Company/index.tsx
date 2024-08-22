import { useState } from "react"
import { useNavigate } from "react-router-dom"

import * as C from "../styled"

import initials from "../../../utils/initials"

import Divider from "../../../components/_minimals/Divider"
import Form from "../../../components/Form"
import PageHeader from "../../../components/PageHeader"

const CompanyPage = () => {
  const navigate = useNavigate()

  const [company, setCompany] = useState(initials.forms.company)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    //
  }

  const handleField = async (field: string, value: any) => {
    setCompany((c) => ({ ...c, [field]: value }))
  }

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"companies"} />

      <Divider />

      <Form
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleField={handleField}
        groups={[
          {
            groupInfo: {
              name: "Detalhes da Empresa",
              description: ["Informe o nome da Empresa e CNPJ"],
            },
            fields: [
              {
                type: "input",
                label: "Nome da empresa",
                field: "name",
                value: company.name,
              },
              {
                type: "input",
                label: "CNPJ",
                field: "cnpj",
                value: company.cnpj,
              },
            ],
          },
        ]}
      />
    </C.Content>
  )
}

export default CompanyPage
