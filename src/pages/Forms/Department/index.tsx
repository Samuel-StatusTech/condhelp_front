import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as C from "../styled"

import initials from "../../../utils/initials"

import PageHeader from "../../../components/PageHeader"
import Divider from "../../../components/_minimals/Divider"
import Form from "../../../components/Form"

const DepartmentPage = () => {
  const navigate = useNavigate()

  const [department, setDepartment] = useState(initials.forms.department)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    //
  }

  const handleField = async (field: string, value: any) => {
    setDepartment((d) => ({ ...d, [field]: value }))
  }

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"departments"} />

      <Divider />

      <Form
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleField={handleField}
        groups={[
          {
            groupInfo: {
              name: "Detalhes do Departamento",
              description: [
                "Informe o nome para o departamento. Ele estará disponível na lista de depertamentos no cadastro de usuários.",
              ],
            },
            fields: [
              {
                type: "input",
                label: "Nome da empresa",
                field: "name",
                value: department.name,
              },
            ],
          },
        ]}
      />
    </C.Content>
  )
}

export default DepartmentPage
