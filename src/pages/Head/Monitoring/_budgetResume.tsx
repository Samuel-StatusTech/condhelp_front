import * as S from "./styled"
import { Icons } from "../../../assets/icons/icons"
import Divider from "../../../components/_minimals/Divider"
import { getDateStr } from "../../../utils/tb/format/date"
import { TMonitorItemDetails } from "../../../utils/@types/data/monitoring"

type Props = {
  budget: TMonitorItemDetails
}

const BudgetResumeBlock = ({ budget }: Props) => {
  return (
    <S.Block>
      <S.BlockHeader>
        <S.BlockTitle>Orçamento Nº {budget.budgetId}</S.BlockTitle>
        {budget.isUrgent && (
          <S.Urgent>
            <span>URGENTE</span>
            <Icons.Alert />
          </S.Urgent>
        )}
      </S.BlockHeader>

      <Divider />

      <S.DataResumeArea>
        <S.DataInfo>
          <S.DITitle>Condomínio</S.DITitle>
          <S.DIValue>{budget.condominiumName}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Categoria</S.DITitle>
          <S.DIValue>{budget.categoryName}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Unidades</S.DITitle>
          <S.DIValue>{budget.condominiumUnities}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Subcategoria</S.DITitle>
          <S.DIValue>{budget.subCategoryName}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Título</S.DITitle>
          <S.DIValue>{budget.budgetTitle}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Descrição</S.DITitle>
          <S.DIValue>{budget.budgetDescription}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Data Início</S.DITitle>
          <S.DIValue>
            {budget.openingDate ? getDateStr(budget.openingDate, "dmy") : "-"}
          </S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Hora</S.DITitle>
          <S.DIValue>
            {budget.openingDate ? getDateStr(budget.openingDate, "time") : "-"}
          </S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Anexo</S.DITitle>
          <S.FileDownload $disabled={!budget.attachmentUrl}>
            {budget.attachmentUrl ? budget.attachmentUrl : "Não possui"}
          </S.FileDownload>
        </S.DataInfo>
      </S.DataResumeArea>
    </S.Block>
  )
}

export default BudgetResumeBlock
