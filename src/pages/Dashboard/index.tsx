import * as S from "./styled"
import { getStore } from "../../store"

import { DashboardPages } from "./rolePages"

const Dashboard = () => {
  const { user } = getStore()

  const PageContent = () => {
    switch (user?.profile) {
      case "admin":
        return <DashboardPages.Admin />
      case "branch":
        return <DashboardPages.Branch />
      case "franchise":
        return <DashboardPages.Franchise />
      case "manager":
        return <DashboardPages.Manager />
      case "provider":
        return <DashboardPages.Provider />
      default:
        return null
    }
  }

  return (
    <S.Content>
      <PageContent />
    </S.Content>
  )
}

export default Dashboard
