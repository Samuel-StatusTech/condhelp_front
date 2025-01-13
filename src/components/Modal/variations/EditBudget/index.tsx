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

import { checkErrors } from "../../../../utils/tb/checkErrors"
import { TDefaultRes } from "../../../../api/types/responses"

import { getDateStr } from "../../../../utils/tb/format/date"
import { TUserTypes } from "../../../../utils/@types/data/user"
import Lottie from "lottie-react"

import lottieData from "../../../../assets/animations/loading.json"
import { TBudgetStatus } from "../../../../utils/@types/data/status"

type Props = {
  data?: any
  onClose: () => void
  handleOp?: (newBudget: TNewBudget) => void
}

const EditBudget = ({ data, onClose, handleOp }: Props) => {
  const { user, controllers } = getStore()

  const [form, setForm] = useState<TNewBudget>(initials.modals.newBudget)
  const [budgetData, setBudgetData] = useState<TBudget | null>(null)

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [categories, setCategories] = useState<TCategory[]>([])
  const [, setCondos] = useState<TCondominium[]>([])

  const [options, setOptions] = useState<any>({
    subsidiary: [],
    condo: [],
    category: [],
    subcategory: [],
  })

  const getObj = () => {
    const obj: any = {
      id: data.id,
      title: form.title,
      description: form.description,
      startDate: getDateStr(form.startDate, "javaDateTime"),
      finishDate: getDateStr(form.finishDate, "javaDateTime"),
      attachmentUrl: form.attachedUrl,
      urgent: form.urgent,
      condominiumId: budgetData?.idCondominio,
      serviceCategoryId: budgetData?.idCategoria,
      serviceSubcategoryId: budgetData?.idSubCategoria,
      userId: user?.userId as number,
      status: "DISPONIVEL",
      providerIds: budgetData?.prestadores.map((p) => p.id) as number[],
      // @ts-ignore
      franqId: user?.franqId,
    }

    return obj
  }

  const budgetEdit = () => {
    const obj = getObj()

    return new Promise<TDefaultRes<TBudget>>(async (resolve) => {
      const req = await Api.budgets.update({ budget: obj })
      resolve(req)
    })
  }

  const showSuccessFeedback = () => {
    controllers.modal.open({
      role: "successFeedback",
      visible: true,
      width: "sm",
      data: {
        message: `Seu orçamento foi atualizado!`,
      },
      handleOp: () => onClose(),
    })
  }

  const handleSubmit = async () => {
    // TODO: check errors
    setSubmitting(true)

    const update = await budgetEdit()

    if (update.ok) {
      if (handleOp) handleOp(form)

      onClose()

      setSubmitting(false)

      showSuccessFeedback()
    } else {
      controllers.feedback.setData({
        state: "error",
        message: update.error,
        visible: true,
      })

      setSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
  }

  const handleField = (field: string, value: boolean | string) => {
    if (field === "serviceCategoryId") {
      setForm((f) => ({
        ...f,
        serviceSubcategoryId: "0" as any,
        [field]: value as any,
      }))
    } else {
      setForm((f) => ({ ...f, [field]: value }))
    }
  }

  useEffect(() => {
    if (
      form.serviceCategoryId &&
      !Number.isNaN(form.serviceCategoryId) &&
      categories.length > 0
    ) {
      const categoryData = categories.find(
        (c) => c.id === Number(form.serviceCategoryId)
      ) as TCategory

      setForm((f) => ({ ...f, serviceSubcategoryId: 0 }))

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
      setLoading(true)

      let categoriesList: TCategory[] = []
      let condosList: TCondominium[] = []
      let franchisesList: TUserTypes["FRANQUEADO"][] = []

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

      // • Details
      proms.push(
        Api.budgets
          .getSingle({ id: data.id })
          .then((res) => {
            if (res.ok) {
              const bdg = res.data

              setBudgetData(bdg)

              const obj: any = {
                title: bdg.titulo,
                description: bdg.descricao,
                startDate: new Date(bdg.dataInicio).getTime(),
                finishDate: new Date(bdg.dataFim).getTime(),
                attachedUrl: bdg.urlAnexo,
                urgent: bdg.isUrgente,
                condominiumId: bdg.idCondominio,
                serviceCategoryId: bdg.idCategoria,
                serviceSubcategoryId: bdg.idSubCategoria,
                userId: user?.userId as number,
                status: bdg.status as TBudgetStatus,
                providerIds: bdg.prestadores.map((p) => p.id),
                // @ts-ignore
                franqId: user?.franqId,
              }

              setForm(obj)
            } else throw new Error()
          })
          .catch(() => {
            throw new Error()
          })
      )

      if (user?.profile === "FRANQUEADO") {
        setForm((frm) => ({
          ...frm,
          franqId: user?.id,
        }))
      } else if (user?.profile === "SINDICO") {
        setForm((frm) => ({
          ...frm,
          franqId: user?.franqId,
        }))
      }

      await Promise.allSettled(proms)

      setCategories(categoriesList)
      setCondos(condosList)

      const newOptions = {
        condo: parseOptionList(condosList, "id", "name"),
        category: parseOptionList(categoriesList, "id", "name"),
        franchise: parseOptionList(franchisesList, "id", "name"),
      }

      setOptions((opts: any) => ({
        ...opts,
        ...newOptions,
      }))

      if (condosList.length === 1 && form.condominiumId === 0) {
        setForm((frm) => ({
          ...frm,
          condominiumId: condosList[0].id,
        }))
      }
    } catch (error) {
      controllers.feedback.setData({
        state: "error",
        message:
          "Não foi possível carregar as informações necessárias. Tente novamente mais tarde.",
        visible: true,
      })

      onClose()
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllers.feedback, data.id, onClose, user])

  useEffect(() => {
    loadData()
  }, [loadData])

  const errors = () => {
    return checkErrors.budgetEdit(form)
  }

  return (
    <S.Element>
      {loading && (
        <S.LoadingContainer>
          <Lottie animationData={lottieData} width={64} height={64} />
        </S.LoadingContainer>
      )}

      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Editar orçamento</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.Row>
          {data.id ? (
            <Input.ReadonlyField
              field="nomeCondominio"
              onChange={() => {}}
              value={budgetData?.nomeCondominio ?? "Nome do condomínio"}
              gridSizes={{ big: 8 }}
              disabled={true}
            />
          ) : (
            <Input.Select
              field={"condominiumId"}
              onChange={handleField}
              value={form.condominiumId as any}
              options={options.condo}
              gridSizes={{ big: 8 }}
              placeholder="Condomínio"
              elevation={2}
            />
          )}

          <Input.Toggler
            field={"urgent"}
            onChange={handleField}
            value={form.urgent}
            gridSizes={{ big: 4 }}
            label="Urgente"
          />
        </S.Row>
        <S.Row>
          {data.id ? (
            <Input.ReadonlyField
              field="nomeCategoria"
              onChange={() => {}}
              value={budgetData?.nomeCategoria ?? "Categoria"}
              gridSizes={{ big: 12 }}
              disabled={true}
            />
          ) : (
            <Input.Select
              field={"serviceCategoryId"}
              onChange={handleField}
              value={form.serviceCategoryId as any}
              options={options.category}
              gridSizes={{ big: 12 }}
              placeholder="Categoria"
              elevation={3}
            />
          )}
        </S.Row>

        <S.Row>
          {data.id ? (
            <Input.ReadonlyField
              field="nomeSubCategoria"
              onChange={() => {}}
              value={budgetData?.nomeSubcategoria ?? "Subcategoria"}
              gridSizes={{ big: 12 }}
              disabled={true}
            />
          ) : (
            <Input.Select
              field={"serviceSubcategoryId"}
              onChange={handleField}
              value={form.serviceSubcategoryId as any}
              options={options.subcategory}
              gridSizes={{ big: 12 }}
              placeholder="Subcategoria"
              elevation={4}
            />
          )}
        </S.Row>

        <S.Row>
          {data.id ? (
            <Input.ReadonlyField
              field="titulo"
              label="Título do orçamento"
              onChange={() => {}}
              value={budgetData?.titulo ?? "Título do orçamento"}
              gridSizes={{ big: 12 }}
              disabled={true}
            />
          ) : (
            <Input.Default
              field={"title"}
              onChange={handleField}
              value={form.title}
              gridSizes={{ big: 12 }}
              placeholder="Título do orçamento"
            />
          )}
        </S.Row>

        <S.Row>
          <Input.TextArea
            field={"description"}
            onChange={handleField}
            value={form.description}
            gridSizes={{ big: 12 }}
            placeholder="Descrição"
            limit={1000}
          />
        </S.Row>

        <S.Row>
          {data.id ? (
            <Input.ReadonlyField
              field="dataInicio"
              label="Data de Início"
              onChange={() => {}}
              value={
                getDateStr(new Date(budgetData?.dataInicio as any), "dmy") ??
                "Data de Início"
              }
              gridSizes={{ big: 6 }}
              disabled={true}
            />
          ) : (
            <Input.Date
              field={"startDate"}
              onChange={handleField}
              value={form.startDate}
              gridSizes={{ big: 6 }}
              label="Data de Início"
              minDate={new Date()}
            />
          )}
        </S.Row>

        <S.Row>
          <Input.Date
            field={"finishDate"}
            onChange={handleField}
            value={form.finishDate}
            gridSizes={{ big: 6 }}
            label="Data fim"
            minDate={new Date(form.startDate)}
          />
        </S.Row>

        <S.Row>
          <Input.File
            field={"attachedUrl"}
            onChange={handleField}
            value={form.attachedUrl}
            gridSizes={{ big: 12 }}
            label="Anexar um arquivo"
            singleComponent={true}
            allowsPdf={true}
          />
        </S.Row>

        <S.Bottom>
          <Button
            type="main"
            text="Atualizar"
            action={!submitting ? handleSubmit : () => {}}
            disabled={errors().has}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default EditBudget
