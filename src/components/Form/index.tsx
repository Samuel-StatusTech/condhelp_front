import { memo } from "react"
import * as S from "./styled"
import Input from "../Input"

import Divider from "../_minimals/Divider"

import { TForm } from "../../utils/@types/components/Form"
import { FormField } from "../../utils/@types/components/FormFields"

type Props = TForm

const getElement = (
  field: FormField,
  handleField: Props["handleField"],
  key: number
) => {
  switch (field.type) {
    case "date":
      return <Input.Date {...field} onChange={handleField} key={key} />
    case "image":
      return <Input.Image {...field} onChange={handleField} key={key} />
    case "input":
      return <Input.Default {...field} onChange={handleField} key={key} />
    case "logo":
      return <Input.Logo {...field} onChange={handleField} key={key} />
    case "multiple":
      return <Input.Multiple {...field} onChange={handleField} key={key} />
    case "points":
      return <Input.Points {...field} onChange={handleField} key={key} />
    case "profile":
      return <Input.Profile {...field} onChange={handleField} key={key} />
    case "select":
      return <Input.Select {...field} onChange={handleField} key={key} />
    case "radio":
      return <Input.Radio {...field} onChange={handleField} key={key} />
    case "textarea":
      return <Input.TextArea {...field} onChange={handleField} key={key} />
    case "toggler":
      return <Input.Toggler {...field} onChange={handleField} key={key} />
    default:
      return null
  }
}

const Form = ({ handleField, blocks }: Props) => {
  const renderInput = (field: FormField, key: number) => {
    return getElement(field, handleField, key) ?? null
  }

  return (
    <S.Content>
      <S.BlocksArea>
        {blocks.map((block, blockKey) => (
          <S.Block key={blockKey}>
            <S.BlockTitle>{block.title}</S.BlockTitle>

            {block.groups.map((group, gKey) => (
              <>
                <Divider />
                <S.BlockTitle>{group.title}</S.BlockTitle>
                <S.GroupArea key={gKey}>
                  <S.FormArea>
                    {group.type === "custom"
                      ? group.element
                      : group.fields.map((line, k) =>
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
                  </S.FormArea>
                </S.GroupArea>
              </>
            ))}
          </S.Block>
        ))}
      </S.BlocksArea>
    </S.Content>
  )
}

export default memo(Form)
