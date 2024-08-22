import { useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import { fdata } from "../../utils/_dev/falseData"
import Form from "../../components/Form"
import { useNavigate } from "react-router-dom"
import PageHeader from "../../components/PageHeader"

const BannerPage = () => {
  const navigate = useNavigate()

  const [banner, setBanner] = useState(fdata.banner)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    //
  }

  const handleField = async (field: string, value: any) => {
    setBanner((b) => ({ ...b, [field]: value }))
  }

  return (
    <S.Content>
      <PageHeader type={"breadcrumb"} from={"banner"} />

      <Divider />

      <Form
        groups={[
          {
            groupInfo: {
              name: "Detalhes do Banner Informativo",
              description: [
                "Diferente das mensagens de mural, este banner fica fixado no cabeçalho do Dashboard e é visível para todos os usuários.",
              ],
            },
            fields: [
              {
                type: "toggler",
                label: "Ativo",
                field: "status",
                value: banner.status,
              },
              {
                type: "image",
                label: "Imagem do banner (Recomendado 1140 x 120 pixels)",
                field: "image",
                value: banner.image,
              },
            ],
          },
        ]}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleField={handleField}
      />
    </S.Content>
  )
}

export default BannerPage
