import avatar1 from "../../../assets/fpersons/avatar-1.png"
import avatar2 from "../../../assets/fpersons/avatar-2.png"
import avatar3 from "../../../assets/fpersons/avatar-3.png"
import avatar4 from "../../../assets/fpersons/avatar-4.png"
import avatar5 from "../../../assets/fpersons/avatar-5.png"
import avatar6 from "../../../assets/fpersons/avatar-6.png"
import avatar7 from "../../../assets/fpersons/avatar-7.png"

export const FDcards: any = {
  approval: {
    approved: 595,
    awaiting: 35,
    rejected: 49,
  },
  goalsViews: [
    { id: "id1", goalTitle: "Meta 1", views: 127 },
    { id: "id2", goalTitle: "Meta 2", views: 127 },
    { id: "id3", goalTitle: "Meta 3", views: 127 },
    { id: "id4", goalTitle: "Meta 4", views: 127 },
  ],
  leaders: [
    {
      id: "id1",
      profile: avatar1,
      name: "Fulano",
      company: "StatusTech",
      ranking: 1,
    },
    {
      id: "id2",
      profile: avatar2,
      name: "Fulano",
      company: "StatusTech",
      ranking: 2,
    },
    {
      id: "id3",
      profile: avatar3,
      name: "Fulano",
      company: "StatusTech",
      ranking: 3,
    },
    {
      id: "id4",
      profile: avatar4,
      name: "Fulano",
      company: "StatusTech",
      ranking: 4,
    },
    {
      id: "id5",
      profile: avatar5,
      name: "Fulano",
      company: "StatusTech",
      ranking: 5,
    },
  ],
  goalsLights: [
    { id: "id1", title: "Nome da meta", type: "approved" },
    { id: "id2", title: "Nome da meta", type: "awaiting" },
    { id: "id3", title: "Nome da meta", type: "approved" },
    { id: "id4", title: "Nome da meta", type: "denied" },
  ],
  myTeam: [
    {
      id: "id1",
      profile: avatar6,
      name: "Fulano de Tal",
      points: 120,
      resume: { approved: 3, awaiting: 3, denied: 0 },
    },
    {
      id: "id2",
      profile: avatar7,
      name: "Fulano de Tal",
      points: 120,
      resume: { approved: 3, awaiting: 3, denied: 0 },
    },
    {
      id: "id3",
      profile: avatar6,
      name: "Fulano de Tal",
      points: 120,
      resume: { approved: 3, awaiting: 3, denied: 0 },
    },
    {
      id: "id4",
      profile: avatar7,
      name: "Fulano de Tal",
      points: 120,
      resume: { approved: 3, awaiting: 3, denied: 0 },
    },
  ],
  okr: [
    { id: "id_1", title: "Nome da meta", type: "approved" },
    { id: "id_2", title: "Nome da meta", type: "awaiting" },
  ],
  employeesRanking: [
    {
      id: "id_1",
      name: "Nome do Funcionário",
      role: "RH",
      points: 180,
      ranking: 1,
    },
    {
      id: "id_2",
      name: "Nome do Funcionário",
      role: "RH",
      points: 178,
      ranking: 2,
    },
    {
      id: "id_3",
      name: "Nome do Funcionário",
      role: "Administrativo",
      points: 165,
      ranking: 3,
    },
  ],
  notifications: [
    {
      id: "id_1",
      noter: "Daniela Pereira",
      losedPoints: 10,
      description:
        "Respondida mas não atinge os requisitos mínimos, portanto retirei os pontos.",
      date: new Date(),
      readed: false,
    },
    {
      id: "id_2",
      noter: "Daniela Pereira",
      losedPoints: 5,
      description: "Atraso recorrente no envio das respostas",
      date: new Date(),
      readed: false,
    },
    {
      id: "id_3",
      noter: "Daniela Pereira",
      losedPoints: 5,
      description: "Atraso recorrente no envio das respostas",
      date: new Date(),
      readed: false,
    },
    {
      id: "id_4",
      noter: "Daniela Pereira",
      losedPoints: 5,
      description: "Atraso recorrente no envio das respostas",
      date: new Date(),
      readed: false,
    },
  ],
}
