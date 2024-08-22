import { useEffect, useState } from "react"
import Divider from "../../../components/_minimals/Divider"
import * as C from "../styled"

import Form from "../../../components/Form"
import initials from "../../../utils/initials"
import { useNavigate } from "react-router-dom"
import { TGoalQuestion } from "../../../utils/initials/forms/goal"
import PageHeader from "../../../components/PageHeader"

const GoalPage = () => {
  const navigate = useNavigate()

  const [goal, setGoal] = useState(initials.forms.goal)
  const [options, setOptions] = useState<any>({
    target: [],
    mustApprove: [],
    points: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    //
  }

  const handleField = async (field: string, value: any) => {
    setGoal((g) => ({ ...g, [field]: value }))
  }

  const handleQuestion = async (
    questionKey: number,
    field: string,
    value: any
  ) => {
    const nQsts: TGoalQuestion[] = goal.questions.map((q, k) =>
      k !== questionKey
        ? q
        : {
            ...q,
            [field]: value,
          }
    )

    setGoal((g) => ({ ...g, questions: nQsts }))
  }

  const insertQuestion = async (newField: TGoalQuestion) => {
    const f = { ...newField, options: [] }
    setGoal((g) => ({ ...g, questions: [...g.questions, f] }))
  }

  const removeQuestion = async (key: number) => {
    setGoal((g) => ({
      ...g,
      questions: g.questions.filter((_, k) => k !== key),
    }))
  }

  const duplicateQuestion = async (key: number) => {
    const clone = goal.questions[key]

    setGoal((g) => ({
      ...g,
      questions: [...g.questions, clone],
    }))
  }

  useEffect(() => {
    setOptions({
      target: [
        { key: "employee", value: "Funcionários" },
        { key: "leader", value: "Líderes" },
      ],
      mustApprove: [
        { key: "true", value: "Sim" },
        { key: "false", value: "Não" },
      ],
      points: [
        { key: "5", value: "5" },
        { key: "10", value: "10" },
        { key: "15", value: "15" },
        { key: "20", value: "20" },
        { key: "25", value: "25" },
        { key: "30", value: "30" },
      ],
    })
  }, [])

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"goals"} />

      <Divider />

      <Form
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleField={handleField}
        insertQuestion={insertQuestion}
        handleQuestion={handleQuestion}
        removeQuestion={removeQuestion}
        duplicateQuestion={duplicateQuestion}
        groups={[
          {
            groupInfo: {
              name: "Detalhes básicos da Meta",
              description: [
                "Você deve inserir obrigatoriamente um nome para a meta, determinar o público alvo e seu valor em pontos.",
              ],
            },
            // @ts-ignore
            fields: [
              {
                type: "input",
                label: "Nome da meta",
                field: "name",
                value: goal.name,
              },
              [
                {
                  type: "select",
                  label: "Público alvo",
                  field: "target",
                  value: goal.target,
                  options: options.target,
                  multiple: true,
                },
                {
                  type: "select",
                  label: "Precisa de aprovação",
                  field: "mustApprove",
                  options: options.mustApprove,
                  value: goal.mustApprove,
                },
              ],
              {
                type: "points",
                label: "Pontos",
                field: "points",
                options: options.points,
                value: goal.points,
              },
            ],
          },
          {
            groupInfo: {
              name: "Conteúdo da Meta",
              description: [
                "Insira os vários tipos de campos para as perguntas que devem ser respondidas e determine se são obrigatórias ou não.",
              ],
            },
            hasFieldControl: true,
            fields: goal.questions.map((q) => ({
              type: "question",
              field: "question",
              ...q,
            })),
          },
        ]}
      />
    </C.Content>
  )
}

export default GoalPage
