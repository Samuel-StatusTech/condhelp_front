import { memo } from "react"
import { Icons } from "../../assets/icons/icons"
import { TGoalQuestion } from "../../utils/initials/forms/goal"
import Button from "../Button"
import Input from "../Input"
import { TInputDefault } from "../Input/default"
import { TInputImageProfile } from "../Input/image"
import { TInputPoint } from "../Input/points"
import { TInputSelect } from "../Input/select"
import { TInputToggler } from "../Input/toggler"
import Divider from "../_minimals/Divider"
import * as S from "./styled"
import { generateQuestion } from "../../utils/tb/generateQuestion"
import { TInputDate } from "../Input/date"
import { TInputTextArea } from "../Input/textarea"

type Props = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>
  handleDelete?: () => Promise<void>
  insertQuestion?: (newField: any) => void
  removeQuestion?: (key: number) => void
  duplicateQuestion?: (key: number) => void
  handleQuestion?: (questionKey: number, field: string, value: any) => void
  groups: TGroup[]
}

type IDate = { type: "date" } & TInputDate
type IDefault = { type: "input" } & TInputDefault
type IImage = { type: "image" } & TInputImageProfile
type IPoints = { type: "points" } & TInputPoint
type IProfile = { type: "profile" } & TInputImageProfile
type IQuestion = { type: "question" } & TGoalQuestion
type ISelect = { type: "select"; multiple?: boolean } & TInputSelect
type ITextArea = { type: "textarea" } & TInputTextArea
type IToggler = { type: "toggler" } & TInputToggler

export type Field =
  | IDate
  | IDefault
  | IImage
  | IProfile
  | IPoints
  | IQuestion
  | ISelect
  | ITextArea
  | IToggler

type TContent = Field | Field[]

type TGroup = {
  groupInfo: {
    name: string
    description: string[]
  }
  fields: TContent[]
  list?: TList
  hasFieldControl?: boolean
}

type TList = {
  title: string
  items: any[]
}

const getElement = (
  field: Field,
  handleField: Props["handleField"],
  handleQuestion: Props["handleQuestion"],
  removeQuestion: Props["removeQuestion"],
  duplicateQuestion: Props["duplicateQuestion"],
  key: number
) => {
  switch (field.type) {
    case "date":
      return <Input.Date {...field} onChange={handleField} key={key} />
    case "image":
      return <Input.Image {...field} onChange={handleField} key={key} />
    case "input":
      return <Input.Default {...field} onChange={handleField} key={key} />
    case "question":
      return (
        <Input.Question
          {...field}
          handleQuestion={handleQuestion as any}
          removeQuestion={removeQuestion as any}
          duplicateQuestion={duplicateQuestion as any}
          onChange={handleField}
          k={key as number}
          key={key}
          obligate={field.obligate}
        />
      )
    case "points":
      return <Input.Points {...field} onChange={handleField} key={key} />
    case "profile":
      return <Input.Profile {...field} onChange={handleField} key={key} />
    case "select":
      return <Input.Select {...field} onChange={handleField} key={key} />
    case "textarea":
      return <Input.TextArea {...field} onChange={handleField} key={key} />
    case "toggler":
      return <Input.Toggler {...field} onChange={handleField} key={key} />
    default:
      return null
  }
}

const Form = ({
  groups,
  handleField,
  handleCancel,
  handleQuestion,
  handleDelete,
  removeQuestion,
  duplicateQuestion,
  handleSave,
  insertQuestion,
}: Props) => {
  const renderInput = (field: Field, key: number) => {
    return (
      getElement(
        field,
        handleField,
        handleQuestion,
        removeQuestion,
        duplicateQuestion,
        key
      ) ?? null
    )
  }

  const handleInsertQuestion = () => {
    const nQuestion: TGoalQuestion = generateQuestion()
    if (insertQuestion) insertQuestion(nQuestion)
  }

  const deleteHandler = () => {
    handleDelete && handleDelete()
  }

  return (
    <S.Content>
      <S.Groups>
        {groups.map((group, gKey) => (
          <>
            <S.GroupArea key={gKey}>
              <S.GroupInfo>
                <S.GroupTitle $k={gKey}>{group.groupInfo.name}</S.GroupTitle>
                <S.DescriptionArea>
                  {group.groupInfo.description.map((desc, dKey) => (
                    <S.Description $k={gKey + (dKey + 1.5)} key={dKey}>
                      {desc}
                    </S.Description>
                  ))}
                </S.DescriptionArea>
                {group.list && (
                  <S.List>
                    <S.ListTitle>{group.list.title}</S.ListTitle>
                    <S.ListItemsWrapper>
                      <S.ListItems>
                        {group.list.items.map((i, k) => (
                          <S.LItem key={k}>
                            <S.LIMain>{i.main}</S.LIMain>
                            <S.LISecondary>{i.secondary}</S.LISecondary>
                          </S.LItem>
                        ))}
                      </S.ListItems>
                    </S.ListItemsWrapper>
                  </S.List>
                )}
              </S.GroupInfo>
              <S.FormArea>
                {group.fields.map((line, k) =>
                  Array.isArray(line) ? (
                    <S.FormLine
                      $k={gKey + (k + 1)}
                      $length={group.fields.length + 2}
                    >
                      {line.map((f, fKey) => renderInput(f, fKey))}
                    </S.FormLine>
                  ) : (
                    <S.FormLine
                      $k={gKey + (k + 1)}
                      key={k}
                      $length={group.fields.length}
                    >
                      {renderInput(line, k)}
                    </S.FormLine>
                  )
                )}
                {group.hasFieldControl && (
                  <S.Button onClick={handleInsertQuestion}>
                    <Icons.PlusCircle width={24} height={24} />
                    <span>Inserir campo</span>
                  </S.Button>
                )}
              </S.FormArea>
            </S.GroupArea>
            <Divider />
          </>
        ))}
      </S.Groups>
      <S.Buttons>
        <S.BtnArea>
          <Button type="secondary" text="Cancelar" action={handleCancel} />
          {handleDelete && (
            <Button
              type="tertiary"
              icon={<Icons.Trash width={16} height={16} />}
              action={deleteHandler}
            />
          )}
        </S.BtnArea>
        <S.BtnArea>
          <Button type="main" text="Salvar alterações" action={handleSave} />
        </S.BtnArea>
      </S.Buttons>
    </S.Content>
  )
}

export default memo(Form)
