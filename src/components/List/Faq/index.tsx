import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"

import Button from "../../Button"
import { TFaq } from "../../../utils/@types/data/faq"
import { useState } from "react"
import Divider from "../../_minimals/Divider"

type Props = {
  list: TFaq["items"][number][]

  handleAddQuestion: () => void
  handleQuestion: (id: any, field: string, value: string) => void
  handleRemoveQuestion: (id: any) => void
}

const FaqList = ({
  list,
  handleAddQuestion,
  handleQuestion,
  handleRemoveQuestion,
}: Props) => {
  return (
    <S.Wrapper>
      {list.map((item, sk) => (
        <Item
          key={sk}
          k={sk}
          data={item}
          actions={{
            handleQuestion,
            handleRemoveQuestion,
          }}
        />
      ))}

      <S.Buttons>
        <Button
          type="quaternary"
          action={handleAddQuestion}
          text="Adicionar item"
          icon={<Icons.PlusCircle />}
          iconLeft={true}
          fit={true}
        />
      </S.Buttons>
    </S.Wrapper>
  )
}

type ItemProps = {
  k: number
  data: TFaq["items"][number]
  actions: {
    handleQuestion: Props["handleQuestion"]
    handleRemoveQuestion: Props["handleRemoveQuestion"]
  }
}

const Item = ({ k, data, actions }: ItemProps) => {
  const { handleQuestion, handleRemoveQuestion } = actions

  const [opened, setOpened] = useState(true)

  const toggleOpened = () => {
    setOpened(!opened)
  }

  return (
    <S.Item $k={k}>
      <S.ItemId>#{k + 1}</S.ItemId>
      <S.ItemContent>
        <S.ItemHeader>
          <S.Input
            value={data.question}
            onChange={({ target }) =>
              handleQuestion(data.id, "question", target.value)
            }
            placeholder="Digite aqui o título do FAQ"
          />
          <S.ItemHeaderButtons $opened={opened}>
            <S.BtnArea
              onClick={() => handleRemoveQuestion(data.id)}
              className={opened ? "delete" : ""}
            >
              <Icons.Trash />
            </S.BtnArea>
            <S.BtnArea onClick={toggleOpened} $turnIcon={opened}>
              <Icons.Dropdown />
            </S.BtnArea>
          </S.ItemHeaderButtons>
        </S.ItemHeader>
        <S.ItemAnswerWrapper $opened={opened}>
          <S.ItemAnswerArea>
            <Divider />
            <S.ItemAnswerContent>
              <S.ItemAnswer
                placeholder="Digite aqui a resposta da pergunta"
                value={data.answer}
                onChange={({ target }) =>
                  handleQuestion(data.id, "answer", target.value)
                }
              />
            </S.ItemAnswerContent>
          </S.ItemAnswerArea>
        </S.ItemAnswerWrapper>
      </S.ItemContent>
    </S.Item>
  )
}

export default FaqList
