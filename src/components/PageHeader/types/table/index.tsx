import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as PlusIcon } from "../../../../assets/icons/plus_circle.svg"
import { THeaderFrom } from "../.."
import { memo } from "react"
import { getStore } from "../../../../store"

type Props = {
  from: THeaderFrom
  action?: (p?: any) => void
}

const titleRelations: { [key in THeaderFrom]: string } = {
  franchiseCities: "",
  panelBudget: "",
  panelProvider: "",
  users: "Usuários",
  condos: "Condomínios",
  categories: "Categorias",
  subcategories: "Subcategorias",
  regions: "Regiões",
  errands: "Recados",
  faqs: "Perguntas frequentes",
  faqView: "Perguntas frequentes",
}

const TablePageHeader = ({ from, action }: Props) => {
  const { user } = getStore()

  const canCreate =
    action &&
    ((from === "condos" && !(user?.profile === "SINDICO")) ||
      (from === "condos" &&
        user?.profile === "SINDICO" &&
        user?.condominiums.length > 0) ||
      from !== "condos")

  const handleAction = () => {
    action && action()
  }

  return (
    <C.Element>
      <S.PageIndicator
        $k={1}
        $fullSize={
          user?.profile === "SINDICO" && user?.condominiums.length === 0
        }
      >
        <span>
          {from === "condos" && user?.profile === "SINDICO"
            ? "Seus condomínios"
            : titleRelations[from]}
        </span>
      </S.PageIndicator>
      {canCreate && (
        <S.Button $k={2} onClick={handleAction}>
          <PlusIcon />
          <span>Novo</span>
        </S.Button>
      )}
    </C.Element>
  )
}

export default memo(TablePageHeader)
