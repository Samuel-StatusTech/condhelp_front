import * as S from "./styled"

import { TErrand } from "../../utils/@types/data/errand"
import { Icons } from "../../assets/icons/icons"

type Props = {
  status: TErrand["status"]
  action: (param?: any) => void
}

const ErrandStatusIndicador = ({ status, action }: Props) => {
  return (
    <S.Area>
      <S.Indicador>
        <S.IndicadorDot $status={status} />
        <S.IndicadorMessage>
          {status === "sketch" ? "Rascunho" : "Enviado"}
        </S.IndicadorMessage>
      </S.Indicador>
      <S.Button onClick={action}>
        <Icons.Mail />
        <span>{status === "sketch" ? "Enviar recado" : "Repetir envio"}</span>
      </S.Button>
    </S.Area>
  )
}

export default ErrandStatusIndicador
