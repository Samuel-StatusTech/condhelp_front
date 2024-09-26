import { memo } from "react"
import { PCard } from "../../utils/@types/components/Card"
import Variations from "./variations"
import CardVariationsTemplate from "./variations/_template"

type Props = PCard

const Card = ({ k, type, title, data, actions }: Props) => {
  const getComponent = () => {
    let el = <></>

    switch (type) {
      case "approvalResume":
        el = <Variations.ApprovalResume k={k} title={title} data={data} />
        break
      case "employees":
        el = <Variations.Employees k={k} title={title} data={data} />
        break
      case "goalsViews":
        el = (
          <Variations.GoalsViews k={k} title={title} data={data} {...actions} />
        )
        break
      case "leaderOverview":
        el = <CardVariationsTemplate k={k} title={title} />
        break
      case "leaders":
        el = <Variations.Leaders k={k} title={title} data={data} {...actions} />
        break
      case "lights":
        el = <Variations.Lights k={k} title={title} data={data} {...actions} />
        break
      case "notifications":
        el = (
          <Variations.Notifications
            k={k}
            title={title}
            data={data}
            {...actions}
          />
        )
        break
      case "status":
        el = <CardVariationsTemplate k={k} title={title} />
        break
      case "team":
        el = <Variations.Team k={k} title={title} data={data} {...actions} />
        break
      case "leaderDetails":
        el = <Variations.LeaderDetails k={k} data={data} {...actions} />
        break
      case "memberDetails":
        el = <Variations.MemberDetails k={k} data={data} {...actions} />
        break
      default:
        break
    }

    return el
  }

  return getComponent()
}

export default memo(Card)
