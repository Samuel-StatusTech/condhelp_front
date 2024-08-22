import * as C from "../../styled"

import { ReactComponent as DropdownIcon } from "../../../../assets/icons/dropdown.svg"
import { useState } from "react"
import Divider from "../../../_minimals/Divider"

type Props = {
  k: number
  icon?: JSX.Element
  title: string
  children?: JSX.Element | JSX.Element[]
}

const CardVariationsTemplate = ({ k, icon, title, children }: Props) => {
  const [isOpened, setIsOpened] = useState(true)

  return (
    <C.Element $k={k}>
      <C.HTop onClick={() => setIsOpened(!isOpened)}>
        <C.Header>
          <C.HPart $k={k}>
            {icon}
            <span>{title}</span>
          </C.HPart>
          <C.HPart $k={k} $expanded={isOpened}>
            <span>{isOpened ? "Recolher" : "Expandir"}</span>
            <DropdownIcon />
          </C.HPart>
        </C.Header>
        <Divider />
      </C.HTop>
      <C.MainWrapper $expanded={isOpened}>
        <C.ContentWrapper>
          <C.Content>{children}</C.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </C.Element>
  )
}

export default CardVariationsTemplate
