import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"
import { useEffect, useState } from "react"
import initials from "../../../../utils/initials"

import Button from "../../../Button"
import { TNewBudget } from "../../../../utils/@types/data/budget"
import { fdata } from "../../../../utils/_dev/falseData"

import { parseOptionList } from "../../../../utils/tb/parsers/parseOptionList"
import { getStore } from "../../../../store"

type Props = {
  data?: any
  onClose: () => void
  handleOp?: (newBudget: TNewBudget) => void
}

const NewBudget = ({ onClose, handleOp }: Props) => {
  const { user } = getStore()

  const [form, setForm] = useState<TNewBudget>({
    ...initials.modals.newBudget,
  })

  const [options, setOptions] = useState<any>({
    FRANQUEADO: [],
    condo: [],
    category: [],
    subcategory: [],
  })

  const handleSubmit = () => {
    // TODO: check errors

    if (handleOp) handleOp(form)

    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  const handleField = (field: string, value: boolean | string) => {
    if (field === "points") {
      // setForm((f) => ({ ...f, points: f.points + +value }))
    } else setForm((f) => ({ ...f, [field]: value }))
  }

  useEffect(() => {
    setOptions((opts: any) => ({
      ...opts,
      subcategory: parseOptionList(
        fdata.categories[0].serviceSubcategories,
        "id",
        "name"
      ),
    }))
  }, [form.category])

  useEffect(() => {
    setOptions((opts: any) => ({
      ...opts,
      condo: parseOptionList(fdata.condos, "id", "name"),
      category: parseOptionList(fdata.categories, "id", "name"),
      subcategory: parseOptionList(
        fdata.categories[0].serviceSubcategories,
        "id",
        "name"
      ),
    }))
  }, [])

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Novo Orçamento</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        {/* For Branches */}
        {user?.profile === "FILIAL" && (
          <Input.Select
            field={"FRANQUEADO"}
            onChange={handleField}
            value={form.FRANQUEADO as string}
            options={options.FRANQUEADO}
            gridSizes={{ big: 12 }}
            placeholder="Franquia"
          />
        )}

        {/* For Branches and Managers */}
        <Input.Select
          field={"condo"}
          onChange={handleField}
          value={form.condominium}
          options={options.condo}
          gridSizes={{ big: 8 }}
          placeholder="Condomínio"
        />

        <Input.Toggler
          field={"urgent"}
          onChange={handleField}
          value={form.urgent}
          gridSizes={{ big: 4 }}
          label="Urgente"
        />

        <Input.Select
          field={"category"}
          onChange={handleField}
          value={form.category}
          options={options.category}
          gridSizes={{ big: 12 }}
          placeholder="Categoria"
        />

        <Input.Select
          field={"subcategory"}
          onChange={handleField}
          value={form.subcategory}
          options={options.subcategory}
          gridSizes={{ big: 12 }}
          placeholder="Subcategoria"
        />

        <Input.Default
          field={"title"}
          onChange={handleField}
          value={form.title}
          gridSizes={{ big: 12 }}
          placeholder="Condomínio"
        />

        <Input.Default
          field={"title"}
          onChange={handleField}
          value={form.title}
          gridSizes={{ big: 12 }}
          placeholder="Título do orçamento"
        />

        <Input.Default
          field={"description"}
          onChange={handleField}
          value={form.description}
          gridSizes={{ big: 12 }}
          placeholder="Descrição"
          limit={100}
        />

        <Input.Date
          field={"start"}
          onChange={handleField}
          value={form.start}
          gridSizes={{ big: 6 }}
          label="Data de Início"
        />

        <Input.Date
          field={"end"}
          onChange={handleField}
          value={form.end}
          gridSizes={{ big: 6 }}
          label="Data fim"
        />

        <Input.File
          field={"file"}
          onChange={handleField}
          value={form.file as File | null}
          gridSizes={{ big: 12 }}
          label="Anexar um arquivo"
          singleComponent={true}
        />

        <S.Bottom>
          <Button type="main" text="Solicitar" action={handleSubmit} />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default NewBudget
