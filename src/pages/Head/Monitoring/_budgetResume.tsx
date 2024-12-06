import * as S from "./styled"
import { Icons } from "../../../assets/icons/icons"
import Divider from "../../../components/_minimals/Divider"
import { getDateStr } from "../../../utils/tb/format/date"

type Props = {
  budget: any
}

const BudgetResumeBlock = ({ budget }: Props) => {
  return (
    <S.Block>
      <S.BlockHeader>
        <S.BlockTitle>Orçamento Nº {budget.id}</S.BlockTitle>
        {budget.isUrgente && (
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
          <S.DIValue>{budget.nomeCondominio}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Categoria</S.DITitle>
          <S.DIValue>{budget.nomeCategoria}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Unidades</S.DITitle>
          <S.DIValue>25</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Subcategoria</S.DITitle>
          <S.DIValue>{budget.nomeSubcategoria}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Título</S.DITitle>
          <S.DIValue>{budget.titulo}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo>
          <S.DITitle>Descrição</S.DITitle>
          <S.DIValue>{budget.descricao}</S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Data Início</S.DITitle>
          <S.DIValue>
            {budget.dataInicio ? getDateStr(budget.dataInicio, "dmy") : "-"}
          </S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Hora</S.DITitle>
          <S.DIValue>
            {budget.dataInicio ? getDateStr(budget.dataInicio, "time") : "-"}
          </S.DIValue>
        </S.DataInfo>
        <S.DataInfo $small={true}>
          <S.DITitle>Anexo</S.DITitle>
          <S.FileDownload $disabled={!budget.urlAnexo}>
            {budget.urlAnexo ? budget.urlAnexo : "Não possui"}
          </S.FileDownload>
        </S.DataInfo>
      </S.DataResumeArea>
    </S.Block>
  )
}

export default BudgetResumeBlock
