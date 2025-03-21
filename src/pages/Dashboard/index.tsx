import * as S from "./styled"
import { getStore } from "../../store"

import { DashboardPages } from "./rolePages"
import { useCallback } from "react"

const Dashboard = () => {
  const { user } = getStore()

  const PageContent = useCallback(() => {
    switch (user?.profile) {
      case "ADMIN":
        return <DashboardPages.Admin />
      case "FILIAL":
        return <DashboardPages.Branch />
      case "FRANQUEADO":
        return <DashboardPages.Franchise />
      case "SINDICO":
        return <DashboardPages.Manager />
      case "PRESTADOR":
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
