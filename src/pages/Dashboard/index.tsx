import { useState } from "react"
import Greetings from "../../components/Greetings"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import { DashboardPages } from "./subpages"

const Dashboard = () => {
  const [page, setPage] = useState<"main" | "leaderDetails" | "teamMember">(
    "main"
  )
  const [secondPageData, setSecondPageData] = useState<any>(null)

  const handleSubPageChange = (
    page: "main" | "leaderDetails" | "teamMember",
    data?: any
  ) => {
    setSecondPageData(data)
    setPage(page)
  }

  const PageContent = () => {
    switch (page) {
      case "main":
        return (
          <DashboardPages.Principal handleSubPageChange={handleSubPageChange} />
        )
      case "leaderDetails":
        return (
          <DashboardPages.Leaders
            handleSubPageChange={handleSubPageChange}
            data={secondPageData}
          />
        )
      case "teamMember":
        return (
          <DashboardPages.TeamMember
            handleSubPageChange={handleSubPageChange}
            data={secondPageData}
          />
        )
      default:
        return (
          <DashboardPages.Principal handleSubPageChange={handleSubPageChange} />
        )
    }
  }

  return (
    <S.Content>
      <Greetings />
      <Divider />

      <PageContent />
    </S.Content>
  )
}

export default Dashboard
