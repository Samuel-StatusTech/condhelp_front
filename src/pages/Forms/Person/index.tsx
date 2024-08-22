import { useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form, { Field } from "../../../components/Form"
import { useNavigate } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import Divider from "../../../components/_minimals/Divider"

const FPpeople = () => {
  const navigate = useNavigate()

  const [person, setPerson] = useState(initials.forms.person)
  const [options, setOptions] = useState<any>({
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

  const profileTeamLine: any =
    !person.level || person.level === "employee"
      ? [
          {
            type: "select",
            label: "Perfil de acesso",
            field: "level",
            options: options.level,
            value: person.level,
          } as Field,
          {
            type: "select",
            label: "Líder do Funcionário",
            field: "leader",
            options: options.leader,
            value: person.leader,
          } as Field,
        ]
      : [
          {
            type: "select",
            label: "Perfil de acesso",
            field: "level",
            options: options.level,
            value: person.level,
          } as Field,
        ]

  const handleField = async (field: string, value: any) => {
    setPerson((p) => ({ ...p, [field]: value }))
  }

  useEffect(() => {
    setOptions({
      company: [
        { key: "lala1", value: "Empresa 1" },
        { key: "lala2", value: "Empresa 2" },
        { key: "lala3", value: "Empresa 3" },
        { key: "lala4", value: "Empresa 4" },
      ],
      department: [
        { key: "lala1", value: "Departamento 1" },
        { key: "lala2", value: "Departamento 2" },
        { key: "lala3", value: "Departamento 3" },
        { key: "lala4", value: "Departamento 4" },
        { key: "lala5", value: "Departamento 5" },
        { key: "lala6", value: "Departamento 6" },
        { key: "lala7", value: "Departamento 7" },
      ],
      level: [
        { key: "employee", value: "Funcionário" },
        { key: "leader", value: "Líder" },
      ],
      leader: [
        { key: "lala1", value: "Líder 1" },
        { key: "lala2", value: "Líder 2" },
        { key: "lala3", value: "Líder 3" },
        { key: "lala4", value: "Líder 4" },
        { key: "lala5", value: "Líder 5" },
      ],
    })
  }, [])

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"people"} />

      <Divider />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        groups={[
          {
            groupInfo: {
              name: "Detalhes do Banner Informativo",
              description: [
                "Diferente das mensagens de mural, este banner fica fixado no cabeçalho do Dashboard e é visível para todos os usuários.",
              ],
            },
            // eslint-disable-next-line no-sparse-arrays
            fields: [
              {
                type: "toggler",
                label: "Ativo",
                field: "active",
                value: person.active,
              },
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
              [
                {
                  type: "select",
                  label: "Empresa",
                  field: "company",
                  options: options.company,
                  value: person.company,
                },
                {
                  type: "select",
                  label: "Departamento",
                  field: "department",
                  options: options.department,
                  value: person.department,
                },
              ],
              profileTeamLine,
              {
                type: "profile",
                label: "Foto do perfil",
                field: "profile",
                value: person.profile,
              },
            ],
          },
        ]}
      />
    </C.Content>
  )
}

export default FPpeople
