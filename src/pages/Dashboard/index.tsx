import * as S from "./styled"
import { getStore } from "../../store"

import { DashboardPages } from "./rolePages"
import Greetings from "../../components/Greetings"

const Dashboard = () => {
  const { user } = getStore()

  const PageContent = () => {
    switch (user?.profile) {
      case "admin":
        return <DashboardPages.Admin />
      default:
        return null
    }
  }

  return (
    <S.Content>
      <Greetings />

      <PageContent />
    </S.Content>
  )
}

export default Dashboard
