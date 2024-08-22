import * as S from "./styled"
import { useState } from "react"

const Banner = () => {
  const [data] = useState<any>(null)

  return (
    <S.Element>
      {!data ? <S.NoContent>Espaço para banner informativo</S.NoContent> : null}
    </S.Element>
  )
}

export default Banner
