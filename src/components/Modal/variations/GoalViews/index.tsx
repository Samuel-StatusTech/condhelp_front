import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

type Props = {
  data: {
    goalName: string
    viewers: any[]
  }
  onClose: () => void
}

const GoalViews = ({ data, onClose }: Props) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            {/* // @ts-ignore */}
            <C.ModalTitle>
              {data && data.goalName ? data.goalName : ""}
            </C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
        <S.Content>
          <S.Description>
            Funcionários e líderes que visualizaram esta meta
          </S.Description>
          <S.ListArea>
            <S.List>
              {data &&
                data.viewers?.map((p, k) => (
                  <S.PersonItem key={k}>
                    <span>{p.name}</span>
                  </S.PersonItem>
                ))}
            </S.List>
          </S.ListArea>
        </S.Content>
      </C.Header>
    </S.Element>
  )
}

export default GoalViews
