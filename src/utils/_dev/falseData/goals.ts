import { TGoal } from "../../@types/data/goal"

export const FDgoals: TGoal[] = [
  {
    id: "id1",
    name: "Tarefa teste",
    author: "Tom Jobim",
    points: 30,
    approvement: false,
    target: "all",
  },
  {
    id: "id2",
    name: "Tarefa outra",
    author: "Vinícius de Moraes",
    points: 15,
    approvement: true,
    target: "employee",
  },
  {
    id: "id3",
    name: "OKR Semanal",
    author: "Caetano Veloso",
    points: 10,
    approvement: true,
    target: "employee",
  },
  {
    id: "id4",
    name: "Conclusão de Meta Proposta",
    author: "Caetano Veloso",
    points: 10,
    approvement: true,
    target: "leader",
  },
]
