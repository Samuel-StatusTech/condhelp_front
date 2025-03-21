import { useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import Divider from "../../../components/_minimals/Divider"

const FPpeople = () => {
  const navigate = useNavigate()

  const [person, setPerson] = useState(initials.forms.person)
  const [, setOptions] = useState<any>({
    company: [],
    department: [],
    level: [],
    leader: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    setPerson((p) => ({ ...p, [field]: value }))
  }

  useEffect(() => {
    setOptions((opts: any) => ({
      ...opts,
      profile: [
        { key: "employee", value: "Funcionário" },
        { key: "leader", value: "Líder" },
      ],
      status: [
        { key: "lala1", value: "Líder 1" },
        { key: "lala2", value: "Líder 2" },
        { key: "lala3", value: "Líder 3" },
        { key: "lala4", value: "Líder 4" },
        { key: "lala5", value: "Líder 5" },
      ],
    }))
  }, [])

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"users"} />

      <Divider />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        blocks={[
          {
            title: "Informações básicas",
            groups: [
              {
                // eslint-disable-next-line no-sparse-arrays
                fields: [
                  [
                    // {
                    //   type: "select",
                    //   label: "Perfil",
                    //   field: "role",
                    //   options: options.profile,
                    //   value: person.profile,
                    // },
                    {
                      type: "toggler",
                      label: "Ativo",
                      field: "active",
                      value: person.active,
                    },
                  ],
                  [
                    {
                      type: "input",
                      label: "Nome",
                      field: "name",
                      value: person.name,
                    },
                    {
                      type: "input",
                      label: "Sobrenome",
                      field: "surname",
                      value: person.surname,
                    },
                  ],
                  {
                    type: "input",
                    label: "Email",
                    field: "email",
                    value: person.email,
                  },
                  // {
                  //   type: "profile",
                  //   label: "Foto do perfil",
                  //   field: "profile",
                  //   value: person.profile,
                  // },
                ],
              },
            ],
          },
          {
            title: "Informações do perfil",
            groups: [
              {
                fields: [],
              },
            ],
          },
        ]}
      />
    </C.Content>
  )
}

export default FPpeople
