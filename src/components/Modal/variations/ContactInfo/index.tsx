import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"
import { useCallback, useEffect, useState } from "react"
import initials from "../../../../utils/initials"

import Button from "../../../Button"
import { TBudget, TNewBudget } from "../../../../utils/@types/data/budget"

import { parseOptionList } from "../../../../utils/tb/parsers/parseOptionList"
import { getStore } from "../../../../store"
import { getDateStr } from "../../../../utils/tb/format/date"
import { Icons } from "../../../../assets/icons/icons"
import { TCategory } from "../../../../utils/@types/data/category"
import { TSubCategory } from "../../../../utils/@types/data/category/subcategories"
import { Api } from "../../../../api"

type Props = {
  data: TBudget & TBudget["contacts"][number]
  onClose: () => void
  handleOp?: (newBudget: TNewBudget) => void
}

const ContactInfo = ({ data, onClose, handleOp }: Props) => {
  const { controllers } = getStore()

  const [isEditing, setIsEditing] = useState(false)

  const [categories, setCategories] = useState<TCategory[]>([])
  const [, setSubCategories] = useState<TSubCategory[]>([])

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
    const cat = categories.find(
      (c) => c.id === Number(form.serviceSubcategoryId)
    )

    setOptions((opts: any) => ({
      ...opts,
      subcategory: parseOptionList(
        cat?.serviceSubcategories ?? [],
        "id",
        "name"
      ),
    }))
  }, [categories, form.serviceSubcategoryId])

  const loadData = useCallback(async () => {
    try {
      let cats: TCategory[] = []
      let subs: TSubCategory[] = []

      let proms: Promise<any>[] = []

      proms.push(
        new Promise((resolve, reject) => {
          Api.categories.listAll({}).then((res) => {
            if (res.ok) {
              cats = res.data.content
              resolve(true)
            } else reject()
          })
        })
      )

      proms.push(
        new Promise((resolve, reject) => {
          Api.subcategories.listAll({}).then((res) => {
            if (res.ok) {
              subs = res.data.content
              resolve(true)
            } else reject()
          })
        })
      )

      await Promise.allSettled(proms)
        .then(() => {
          setCategories(cats)
          setSubCategories(subs)
          setOptions((opts: any) => ({
            ...opts,
            category: parseOptionList(cats, "id", "name"),
            subcategory: parseOptionList(
              cats[0]?.serviceSubcategories ?? [],
              "id",
              "name"
            ),
          }))
        })
        .catch(() => {
          controllers.feedback.setData({
            message: "Não foi possível carregar as informações.",
            state: "error",
            visible: true,
          })
          onClose()
        })
    } catch (error) {}
  }, [controllers.feedback, onClose])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Informações de contato</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.DataResumeArea>
          <S.DataInfo>
            <S.DITitle>Monitor</S.DITitle>
            <S.DIValue>{data.monitor?.name}</S.DIValue>
          </S.DataInfo>
          <S.DataInfo>
            <S.DITitle>Hora</S.DITitle>
            <S.DIValue>{getDateStr(data.date, "time")}</S.DIValue>
          </S.DataInfo>
          <S.DataInfo>
            <S.DITitle>Abertura</S.DITitle>
            <S.DIValue>{getDateStr(data.startDate, "dmy")}</S.DIValue>
          </S.DataInfo>
          <S.DataInfo>
            <S.DITitle>Fechado</S.DITitle>
            <S.DIValue>
              {data.status !== "awaiting"
                ? getDateStr(data.endDate, "dmy")
                : "-"}
            </S.DIValue>
          </S.DataInfo>
        </S.DataResumeArea>

        <Input.Select
          field={"serviceCategoryId"}
          onChange={handleField}
          value={String(form.serviceCategoryId)}
          options={options.category}
          gridSizes={{ big: 12 }}
          placeholder="Categoria"
        />

        <Input.Select
          field={"serviceSubcategoryId"}
          onChange={handleField}
          value={String(form.serviceSubcategoryId)}
          options={options.subcategory}
          gridSizes={{ big: 12 }}
          placeholder="Subcategoria"
        />

        <Input.TextArea
          field={"description"}
          onChange={handleField}
          value={form.description}
          gridSizes={{ big: 12 }}
          placeholder="Descrição"
        />

        <S.Bottom>
          <Button
            type="outlined"
            text="Editar"
            action={() => setIsEditing(true)}
            greenText={true}
            icon={<Icons.Edit />}
            fit={true}
            iconLeft={true}
          />
          <Button
            type="main"
            text="Salvar"
            action={handleSubmit}
            fit={true}
            disabled={!isEditing}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default ContactInfo
