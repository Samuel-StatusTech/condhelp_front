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
import { TCategory } from "../../../../utils/@types/data/category"
import { Api } from "../../../../api"
import { TCondominium } from "../../../../utils/@types/data/condominium"
import { TSubCategory } from "../../../../utils/@types/data/category/subcategories"
import { checkErrors } from "../../../../utils/tb/checkErrors"
import { TDefaultRes } from "../../../../api/types/responses"
import { TUser } from "../../../../utils/@types/data/user"
import { getDateStr } from "../../../../utils/tb/format/date"

type Props = {
  data?: any
  onClose: () => void
  handleOp?: (newBudget: TNewBudget) => void
}

const NewBudget = ({ onClose, handleOp }: Props) => {
  const { user, controllers } = getStore()

  const [form, setForm] = useState<TNewBudget>(initials.modals.newBudget)

  const [categories, setCategories] = useState<TCategory[]>([])
  const [, setCondos] = useState<TCondominium[]>([])

  const [options, setOptions] = useState<any>({
    subsidiary: [],
    condo: [],
    category: [],
    subcategory: [],
  })

  const getObj = () => {
    const obj: TNewBudget = {
      ...form,
      userId: user?.userId as number,
      startDate: getDateStr(form.startDate, "javaDateTime"),
      finishDate: getDateStr(form.finishDate, "javaDateTime"),
    }

    return obj
  }

  const budgetCreate = () => {
    const obj = getObj()

    return new Promise<TDefaultRes<TBudget>>(async (resolve) => {
      const req = await Api.budgets.create({ newBudget: obj })
      resolve(req)
    })
  }

  const handleSubmit = async () => {
    // TODO: check errors

    const creation = await budgetCreate()

    if (creation.ok) {
      if (handleOp) handleOp(form)

      onClose()
    } else {
      controllers.feedback.setData({
        state: "error",
        message: creation.error,
        visible: true,
      })
    }
  }

  const handleClose = () => {
    onClose()
  }

  const handleField = (field: string, value: boolean | string) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  useEffect(() => {
    if (form.serviceCategoryId && !Number.isNaN(form.serviceCategoryId)) {
      const categoryData = categories.find(
        (c) => c.id === Number(form.serviceCategoryId)
      ) as TCategory

      const firstSubcategory = categoryData.serviceSubcategories[0]

      if (firstSubcategory)
        setForm((frm) => ({
          ...frm,
          serviceSubcategoryId: firstSubcategory.id,
        }))

      setOptions((opts: any) => ({
        ...opts,
        subcategory: parseOptionList(
          categoryData.serviceSubcategories,
          "id",
          "name"
        ),
      }))
    }
  }, [categories, form.serviceCategoryId])

  const loadData = useCallback(async () => {
    try {
      let subsidiariesList: TUser[] = []
      let categoriesList: TCategory[] = []
      let condosList: TCondominium[] = []

      let proms: Promise<any>[] = []

      // • Condos
      if (user?.profile === "SINDICO") {
        condosList = user?.condominiums
      } else {
        proms.push(
          Api.condos
            .listAll({})
            .then((res) => {
              if (res.ok) condosList = res.data.content
              else throw new Error()
            })
            .catch(() => {
              throw new Error()
            })
        )
      }

      // • Categories
      proms.push(
        Api.categories
          .listAll({})
          .then((res) => {
            if (res.ok) categoriesList = res.data.content
            else throw new Error()
          })
          .catch(() => {
            throw new Error()
          })
      )

      await Promise.allSettled(proms)

      setCategories(categoriesList)
      setCondos(condosList)
      console.log(subsidiariesList)

      let firstCategorySubcategories: TSubCategory[] =
        categoriesList.length > 0 ? categoriesList[0].serviceSubcategories : []

      setOptions((opts: any) => ({
        ...opts,
        condo: parseOptionList(condosList, "id", "name"),
        category: parseOptionList(categoriesList, "id", "name"),
        subcategory: parseOptionList(firstCategorySubcategories, "id", "name"),
      }))
    } catch (error) {
      controllers.feedback.setData({
        state: "error",
        message:
          "Não foi possível carregar as informações necessárias. Tente novamente mais tarde.",
        visible: true,
      })

      onClose()
    }
  }, [controllers.feedback, onClose, user])

  useEffect(() => {
    loadData()
  }, [loadData])

  const errors = () => {
    return checkErrors.budget(form)
  }

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
        {/* For Branches and Managers */}
        <Input.Select
          field={"condominiumId"}
          onChange={handleField}
          value={form.condominiumId as any}
          options={options.condo}
          gridSizes={{ big: 8 }}
          placeholder="Condomínio"
          elevation={2}
        />

        <Input.Toggler
          field={"urgent"}
          onChange={handleField}
          value={form.urgent}
          gridSizes={{ big: 4 }}
          label="Urgente"
        />

        <Input.Select
          field={"serviceCategoryId"}
          onChange={handleField}
          value={form.serviceCategoryId as any}
          options={options.category}
          gridSizes={{ big: 12 }}
          placeholder="Categoria"
          elevation={3}
        />

        <Input.Select
          field={"serviceSubcategoryId"}
          onChange={handleField}
          value={form.serviceSubcategoryId as any}
          options={options.subcategory}
          gridSizes={{ big: 12 }}
          placeholder="Subcategoria"
          elevation={4}
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
          field={"startDate"}
          onChange={handleField}
          value={form.startDate}
          gridSizes={{ big: 6 }}
          label="Data de Início"
        />

        <Input.Date
          field={"finishDate"}
          onChange={handleField}
          value={form.finishDate}
          gridSizes={{ big: 6 }}
          label="Data fim"
        />

        <Input.File
          field={"attachedUrl"}
          onChange={handleField}
          value={form.attachedUrl}
          gridSizes={{ big: 12 }}
          label="Anexar um arquivo"
          singleComponent={true}
        />

        <S.Bottom>
          <Button
            type="main"
            text="Solicitar"
            action={handleSubmit}
            disabled={errors().has}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default NewBudget
