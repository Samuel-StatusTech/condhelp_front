import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"

import { TFaq } from "../../../utils/@types/data/faq"
import { useState } from "react"

type Props = {
  list: TFaq[]
}

const FaqViewList = ({ list }: Props) => {
  return (
    <S.ListWrapper>
      {list.map((faq, sk) => (
        <S.Wrapper>
          <S.FaqTitle>{faq.title}</S.FaqTitle>
          <S.FaqBox key={sk}>
            {faq.items.map((item, ik) => (
              <Item key={ik} k={ik} data={item} />
            ))}
          </S.FaqBox>
        </S.Wrapper>
      ))}
    </S.ListWrapper>
  )
}

type ItemProps = {
  k: number
  data: TFaq["items"][number]
}

const Item = ({ k, data }: ItemProps) => {
  const [opened, setOpened] = useState(false)

  const toggleOpened = () => {
    setOpened(!opened)
  }

  return (
    <S.Item $k={k}>
      <S.ItemContent onClick={toggleOpened} $opened={opened}>
        <S.ItemHeader $opened={opened}>
          <span>{data.question}</span>
          <S.ItemHeaderButtons $opened={opened}>
            <Icons.Dropdown />
          </S.ItemHeaderButtons>
        </S.ItemHeader>
        <S.ItemAnswerWrapper $opened={opened}>
          <S.ItemAnswerArea>
            <S.ItemAnswerContent>
              <span>{data.answer}</span>
            </S.ItemAnswerContent>
          </S.ItemAnswerArea>
        </S.ItemAnswerWrapper>
      </S.ItemContent>
    </S.Item>
  )
}

export default FaqViewList
