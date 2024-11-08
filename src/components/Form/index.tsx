import { memo } from "react"
import * as S from "./styled"

import { Icons } from "../../assets/icons/icons"
import { TGoalQuestion } from "../../utils/initials/forms/goal"
import Button from "../Button"
import Input from "../Input"

import Divider from "../_minimals/Divider"
import { generateQuestion } from "../../utils/tb/generateQuestion"

import { TForm } from "../../utils/@types/components/Form"
import { FormField } from "../../utils/@types/components/FormFields"

type Props = TForm

const getElement = (
  field: FormField,
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
  handleField,
  handleCancel,
  handleQuestion,
  handleDelete,
  removeQuestion,
  duplicateQuestion,
  handleSave,
  insertQuestion,
  blocks,
}: Props) => {
  const renderInput = (field: FormField, key: number) => {
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
        {blocks.map((block, blockKey) => (
          <S.Block key={blockKey}>
            <S.BlockTitle>{block.title}</S.BlockTitle>

            <Divider />

            {block.groups.map((group, gKey) => (
              <>
                <S.GroupArea key={gKey}>
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
          </S.Block>
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
