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
    case "file":
      return <Input.File {...field} onChange={handleField} key={key} />
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
    case "readonly":
      return <Input.ReadonlyField {...field} onChange={handleField} key={key} />
    case "select":
      return (
        <Input.Select
          {...field}
          zIndex={50 - (key + 1)}
          onChange={handleField}
          key={key}
        />
      )
    case "multipleSelect":
      return (
        <Input.MultipleSelect {...field} onChange={handleField} key={key} />
      )
    case "cityInput":
      return (
        <Input.CityInput {...(field as any)} onChange={handleField} key={key} />
      )
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

const Form = ({ handleField, columns }: Props) => {
  const renderInput = (field: FormField, key: number) => {
    return getElement(field, handleField, key) ?? null
  }

  return (
    <S.Content>
      <S.BlocksArea>
        {columns.map((column, columnKey) => (
          <S.BlockCols key={columnKey}>
            {column.blocks.map((block, blockKey) => (
              <S.Block
                key={blockKey}
                $white={block.isWhite}
                $zIndex={50 + (column.blocks.length + 2 - blockKey)}
                $mobileZIndex={
                  50 + (column.blocks.length + 2 - blockKey) - columnKey
                }
              >
                <S.BlockTitle>{block.title}</S.BlockTitle>

                {block.groups.map((group, gKey) => (
                  <div
                    key={gKey}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      zIndex: 50 - (gKey + 1),
                    }}
                  >
                    <Divider />
                    <S.BlockTitle>{group.title}</S.BlockTitle>
                    <S.GroupArea>
                      <S.FormArea>
                        {group.type === "custom"
                          ? group.element
                          : group.fields.map((line, k) =>
                              Array.isArray(line) ? (
                                <S.FormLine
                                  key={k}
                                  $k={k}
                                  $align={
                                    group.centeredLines &&
                                    group.centeredLines.includes(k + 1)
                                      ? "center"
                                      : undefined
                                  }
                                >
                                  {line.map((f, fKey) => renderInput(f, fKey))}
                                </S.FormLine>
                              ) : (
                                <S.FormLine $k={k} key={k}>
                                  {renderInput(line, k)}
                                </S.FormLine>
                              )
                            )}
                      </S.FormArea>
                    </S.GroupArea>
                  </div>
                ))}
              </S.Block>
            ))}
          </S.BlockCols>
        ))}
      </S.BlocksArea>
    </S.Content>
  )
}

export default memo(Form)
