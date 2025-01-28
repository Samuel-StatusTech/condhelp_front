import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { TBudget } from "../../@types/data/budget"
import ColorTextIndicator from "../../../components/ColorTextIndicator"
import { getDateStr } from "../../tb/format/date"
import { relations } from "../relations"
import { TBudgetStatus } from "../../@types/data/status"

export const finishedBudgetsResumeTableConfig: TConfig = {
  columns: [
    { title: "Título", field: "title" },
    { title: "Condomínio", field: "condo" },
    { title: "Data fim", field: "endDate" },
    { title: "Status", field: "status" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    condo: (item: TBudget) => item.condominiumName,
    endDate: (item: TBudget) => getDateStr(item.endDate, "dmy"),
    status: (item: TBudget) => (
      <ColorTextIndicator
        role="budgetStatus"
        data={item.status}
        text={
          item.statusProvider !== null
            ? relations.budgetStatus[item.statusProvider as TBudgetStatus]
            : relations.budgetStatus[item.status as TBudgetStatus]
        }
      />
    ),

    actions: (item: TBudget, { callbacks }) => {
      return (
        <TableActions
          id={item.id}
          content={
            callbacks?.reparticipate
              ? (
                  [
                    "RECUSADO_PRESTADOR",
                    "CANCELADO_PRESTADOR",
                  ] as TBudgetStatus[]
                ).includes(item.statusProvider as TBudgetStatus) &&
                !(
                  [
                    "CANCELADO_SINDICO",
                    "FINALIZADO",
                    "EXPIRADO",
                  ] as TBudgetStatus[]
                ).includes(item.status as TBudgetStatus)
                ? [
                    {
                      role: "reparticipate",
                      action: callbacks?.reparticipate as (
                        budgetId: any
                      ) => void,
                      type: "textonly",
                    },
                  ]
                : []
              : callbacks?.redirect
              ? [
                  {
                    role: "redirect",
                    action: callbacks?.redirect as (budgetId: any) => void,
                    type: "icon",
                  },
                ]
              : [
                  {
                    role: "edit",
                    action: callbacks?.edit as (budgetId: any) => void,
                    type: "icon",
                  },
                ]
          }
        />
      )
    },
  },
}
