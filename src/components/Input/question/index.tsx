import * as S from "./styles"
import Input from ".."
import { TGoalQuestion } from "../../../utils/initials/forms/goal"
import Divider from "../../_minimals/Divider"
import { Icons } from "../../../assets/icons/icons"
import { generateOption } from "../../../utils/tb/generateOption"

type Props = TGoalQuestion & {
  obligate: boolean
  onChange: (field: string, v: any) => void
  handleQuestion: (nQuestion: number, field: string, v: any) => void
  removeQuestion: (key: number) => void
  duplicateQuestion: (key: number) => void
  k: number
}

const Question = (props: Props) => {
  const { k, handleQuestion, removeQuestion, duplicateQuestion } = props

  const handleQuestionField = (field: string, value: any) => {
    handleQuestion(k, field, value)
  }

  const handleRemoveQuestion = () => {
    removeQuestion(props.k)
  }

  const handleDuplicateQuestion = () => {
    duplicateQuestion(props.k)
  }

  const handleOption = (key: number, fld: string, val: any) => {
    // if checkbox ...
    if (props.answerType === "checkbox") {
      const opts = props.options.map((opt, k) =>
        k !== key ? opt : { [fld]: val }
      )
      handleQuestion(k, "options", opts)
    }
    // if multiple ...
    if (props.answerType === "multiple") {
      const opts = props.options.map((opt, k) => ({
        checked: fld !== "checked" ? opt.checked : k === key,
        title: fld === "title" && k === key ? val : opt.title,
      }))

      handleQuestion(k, "options", opts)
    }
  }

  const handleInsertOption = () => {
    if (props.answerType === "checkbox" || props.answerType === "multiple") {
      handleQuestion(k, "options", [...props.options, generateOption()])
    }
  }

  return (
    <S.Wrapper>
      <S.Area>
        <S.ConfigArea>
          <Input.Default
            field="title"
            label="Pergunta"
            onChange={handleQuestionField}
            value={props.title}
          />
          <Input.Select
            field="answerType"
            label="Resposta"
            onChange={handleQuestionField}
            options={[
              { key: "text", value: "Texto" },
              { key: "date", value: "Data" },
              { key: "checkbox", value: "Checkbox" },
              { key: "multiple", value: "Múltipla" },
            ]}
            value={props.answerType}
          />
        </S.ConfigArea>

        {props.answerType === "checkbox" &&
          props.options &&
          props.options.map((opt, oKey) => (
            <Input.Checkbox
              key={oKey}
              label="Item"
              onChange={(optionField, value) =>
                handleOption(oKey, optionField, value)
              }
              value={opt}
              fromForm={true}
            />
          ))}

        {props.answerType === "multiple" &&
          props.options &&
          props.options.map((opt, oKey) => (
            <Input.Multiple
              key={oKey}
              label="Item"
              onChange={(optionField, value) =>
                handleOption(oKey, optionField, value)
              }
              value={opt}
              fromForm={true}
            />
          ))}

        {(props.answerType === "checkbox" ||
          props.answerType === "multiple") && (
          <S.Button onClick={handleInsertOption}>
            <Icons.PlusCircle width={24} height={24} />
            <span>Inserir campo</span>
          </S.Button>
        )}

        <Divider />
        <S.Bottom>
          <Input.Toggler
            field="obligate"
            label="Obrigatória"
            onChange={handleQuestionField}
            value={props.obligate}
          />
          <S.QuestionControl>
            <S.Control onClick={handleRemoveQuestion}>
              <Icons.Trash />
            </S.Control>
            <S.Control onClick={handleDuplicateQuestion}>
              <Icons.Copy />
            </S.Control>
          </S.QuestionControl>
        </S.Bottom>
      </S.Area>
    </S.Wrapper>
  )
}

export default Question
