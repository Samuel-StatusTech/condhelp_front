import * as S from "./styled"
import { TBudget } from "../../../utils/@types/data/budget"
import { Icons } from "../../../assets/icons/icons"
import Divider from "../../../components/_minimals/Divider"
import { getDateStr } from "../../../utils/tb/format/date"

type Props = {
  budget: TBudget
}

const BudgetResumeBlock = ({ budget }: Props) => {
  return (
    <S.Block>
      <S.BlockHeader>
        <S.BlockTitle>Orçamento Nº {budget.id}</S.BlockTitle>
        {budget.urgent && (
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
          <S.DIValue>{budget.condominium.name}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Categoria</S.DITitle>
          <S.DIValue>{budget.category}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Unidades</S.DITitle>
          <S.DIValue>{budget.condominium.unities}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Subcategoria</S.DITitle>
          <S.DIValue>{budget.subcategory}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Título</S.DITitle>
          <S.DIValue>{budget.title}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Descrição</S.DITitle>
          <S.DIValue>{budget.description}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Data Início</S.DITitle>
          <S.DIValue>{getDateStr(budget.startDate, "dmy")}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Hora</S.DITitle>
          <S.DIValue>{getDateStr(budget.startDate, "time")}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Anexo</S.DITitle>
          <S.FileDownload $disabled={!budget.file}>
            {budget.file ? budget.file.name : "Não possui"}
          </S.FileDownload>
        </S.DataInfo>
      </S.DataResumeArea>
    </S.Block>
  )
}

export default BudgetResumeBlock
