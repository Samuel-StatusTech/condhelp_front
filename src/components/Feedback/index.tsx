import * as S from "./styled"

import { TFeedback } from "../../utils/@types/components/feedback"

type Props = {
  data: TFeedback
}

const Feedback = ({ data }: Props) => {
  return (
    <S.Box
      $color={
        data.state === "success"
          ? "green"
          : data.state === "alert"
          ? "orange"
          : "red"
      }
      $visible={data.visible}
    >
      <span>{data.message}</span>
    </S.Box>
  )
}

export default Feedback
