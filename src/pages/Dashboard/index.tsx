import * as S from "./styled"
import { getStore } from "../../store"

import { DashboardPages } from "./rolePages"
import { useCallback } from "react"

const Dashboard = () => {
  const { user } = getStore()

  const PageContent = useCallback(() => {
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
  }, [user?.profile])

  return (
    <S.Content>
      <PageContent />
    </S.Content>
  )
}

export default Dashboard
