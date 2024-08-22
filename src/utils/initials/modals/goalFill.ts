export type TGoalFill = {
  id: string
  bare: {
    name: string
    points: number
    obligate: boolean
  }
  questions: TGoalQuestion[]
}

export const goalFill: TGoalFill = {
  id: "id1",
  bare: {
    name: "",
    points: 0,
    obligate: false,
  },
  questions: [
    {
      type: "text",
      title: "Pergunta tipo texto",
      answer: "",
    },
    {
      type: "date",
      title: "Pergunta tipo data",
      answer: new Date().toISOString(),
    },
    {
      type: "checkbox",
      title: "Pergunta tipo checkbox",
      answer: ["opcao-2", "opcao-4"],
      options: [
        { key: "opcao-1", value: "Opção 1" },
        { key: "opcao-2", value: "Opção 2" },
        { key: "opcao-3", value: "Opção 3" },
        { key: "opcao-4", value: "Opção 4" },
      ],
    },
    {
      type: "multiple",
      title: "Pergunta tipo Múltipla",
      answer: "opcao-2",
      options: [
        { key: "opcao-1", value: "Opção 1" },
        { key: "opcao-2", value: "Opção 2" },
        { key: "opcao-3", value: "Opção 3" },
        { key: "opcao-4", value: "Opção 4" },
      ],
    },
  ],
}

// Sub types

type TGoalQuestion = VText | VDate | VCheckbox | VMultiple

type VText = {
  type: "text"
  title: string
  answer: string
}

type VDate = {
  type: "date"
  title: string
  answer: string
}

type VCheckbox = {
  type: "checkbox"
  title: string
  answer: string[]
  options: { key: any; value: string }[]
}

type VMultiple = {
  type: "multiple"
  title: string
  answer: string
  options: { key: any; value: string }[]
}
