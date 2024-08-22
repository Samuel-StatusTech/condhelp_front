import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"
import Input from "../../../Input"
import { useMemo, useState } from "react"
import Button from "../../../Button"
import { TGoalFill } from "../../../../utils/initials/modals/goalFill"

type Props = {
  data: TGoalFill
  onClose: () => void
}

const GoalFill = ({ data, onClose }: Props) => {
  const [update, setUpdate] = useState<Props["data"]>(data)

  const handleClose = () => {
    onClose()
  }

  const handleAnswer = (questionId: number, value: any) => {
    setUpdate((u) => ({
      ...u,
      questions: u.questions.map((q, k) =>
        k !== questionId ? q : { ...q, answer: value }
      ),
    }))
  }

  const handleOption = (
    questionId: number,
    type: "checkbox" | "multiple",
    value: any,
    isChecked: boolean
  ) => {
    if (type === "checkbox") {
      // @ts-ignore
      setUpdate((u) => ({
        ...u,
        questions: u.questions.map((q, k) =>
          k !== questionId
            ? q
            : {
                ...q,
                answer: isChecked
                  ? (q.answer as string[]).filter((i) => i !== value)
                  : [...(q.answer as string[]), value],
              }
        ),
      }))
    } else if (type === "multiple") {
      setUpdate((u) => ({
        ...u,
        questions: u.questions.map((q, k) =>
          k !== questionId ? q : { ...q, answer: value }
        ),
      }))
    }
  }

  const handleSave = () => {
    // ...
    onClose()
  }

  // Questions

  const renderQuestion = useMemo(
    () => (q: TGoalFill["questions"][number], key: number) => {
      let el: any = null

      switch (q.type) {
        case "text":
          el = (
            <Input.Default
              field={key}
              label={q.title}
              onChange={handleAnswer}
              value={q.answer}
              placeholder="Sua resposta"
            />
          )
          break
        case "date":
          el = (
            <Input.Date
              field={key}
              label={q.title}
              onChange={(_, v) => handleAnswer(key, v)}
              value={q.answer}
            />
          )
          break
        case "checkbox":
          el = (
            <Input.Checkbox
              label={q.title}
              onChange={(opt: any, isChecked) =>
                handleOption(key, "checkbox", opt, isChecked)
              }
              options={q.options}
              value={q.answer as string[]}
              fromForm={false}
            />
          )
          break

        default:
          break
      }

      return el
    },
    []
  )

  return (
    <C.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>{update.bare.name}</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
          <S.GoalPoints>
            {update.bare.points} ponto{update.bare.points > 0 ? "s" : ""}
          </S.GoalPoints>
        </C.HeaderDefault>
      </C.Header>
      <S.Content>
        {update.questions.map((q, k) => renderQuestion(q, k))}
        <S.Bottom>
          <Button type="main" text="Salvar alterações" action={handleSave} />
        </S.Bottom>
      </S.Content>
    </C.Element>
  )
}

export default GoalFill
