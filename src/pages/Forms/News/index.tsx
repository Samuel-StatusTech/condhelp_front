import { useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import Divider from "../../../components/_minimals/Divider"

const fReaders: any[] = [
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
  { main: "Nome do funcionário", secondary: "16/01/24 - 14:45h" },
]

const FPNews = () => {
  const navigate = useNavigate()

  const [news, setNews] = useState(initials.forms.news)
  const [readers, setReaders] = useState<any[]>([])
  const [options, setOptions] = useState<any>({
    company: [],
    department: [],
    level: [],
    leader: [],
    target: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    setNews((p) => ({ ...p, [field]: value }))
  }

  useEffect(() => {
    setReaders(fReaders)

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
      target: [
        { key: "all", value: "Todos" },
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
      <PageHeader type={"breadcrumb"} from={"newsboard"} />

      <Divider />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        groups={[
          {
            groupInfo: {
              name: "Detalhes da mensagem para o Mural",
              description: [
                "Informe um título, escreva o conteúdo e adicione uma imagem de destaque. Você pode determinar uma data de expiração automática ou excluir manualmente a mensagem do mural.",
                "Caso informe um link de acesso externo, ele será exibido como um botão no final da mensagem.",
                "Determine se a mensagem do mural precisa ter a confirmação de leitura dos usuários. Ela permanecerá no banner de destaque do dashboard até que a leitura seja confirmada.",
              ],
            },
            // eslint-disable-next-line no-sparse-arrays
            fields: [
              {
                type: "input",
                label: "Título",
                field: "title",
                placeholder: "Escreva um título para sua mensagem",
                value: news.title,
              },
              {
                type: "textarea",
                label: "Mensagem de texto",
                placeholder: "Escreva a mensagem de texto para o mural",
                field: "message",
                value: news.message,
              },
              {
                type: "input",
                label: "Link",
                placeholder:
                  "Se necessário, informe um link que será exibido com um botão.",
                field: "link",
                value: news.link,
              },
              [
                {
                  type: "toggler",
                  label: "Confirmar leitura",
                  field: "readConfirm",
                  value: news.readConfirm,
                },
                {
                  type: "toggler",
                  label: "Expira",
                  field: "expires",
                  value: news.expires,
                },
              ],
              [
                {
                  type: "select",
                  label: "Público alvo",
                  field: "target",
                  options: options.target,
                  value: news.target,
                },
                {
                  type: "date",
                  label: "Data de expiração",
                  field: "expiration",
                  value: news.expiration,
                  disabled: String(news.expires) === "false",
                },
              ],
              {
                type: "image",
                label: "Imagem de destaque",
                field: "image",
                value: news.image,
              },
            ],
            list: {
              title: "Pessoas que já leram",
              items: readers,
            },
          },
        ]}
      />
    </C.Content>
  )
}

export default FPNews
