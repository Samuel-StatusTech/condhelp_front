import * as S from "./styled"
import { getStore } from "../../store"

import { DashboardPages } from "./rolePages"
import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Api } from "../../api"

const Dashboard = () => {
  const location = useLocation()

  const { user, controllers } = getStore()

  const [canLoadData, setCanLoadData] = useState(false)

  const handlePasswordReset = useCallback(
    async (newPassword: string) => {
      try {
        const req = await Api.auth.resetPassword({
          newPassword,
          username: user?.email as string,
        })

        if (req.ok) {
          controllers.modal.close()
          controllers.feedback.setData({
            message: "Senha atualizada com sucesso.",
            state: "success",
            visible: true,
          })
        } else throw new Error()
      } catch (error) {
        controllers.modal.close()
        controllers.feedback.setData({
          message:
            "Não foi possível atualizar sua senha. Tente novamente mais tarde.",
          state: "alert",
          visible: true,
        })
      }

      setCanLoadData(true)
    },
    [controllers.feedback, controllers.modal, user?.email]
  )

  useEffect(() => {
    const shouldResetPass = location.state && location.state.resetPass
    if (shouldResetPass) {
      controllers.modal.open({
        role: "resetPassword",
        visible: true,
        width: "sm",
        bluredBack: true,
        handleOp: handlePasswordReset,
      })
    } else setCanLoadData(true)
  }, [controllers.modal, handlePasswordReset, location.state])

  const PageContent = useCallback(() => {
    switch (user?.profile) {
      case "ADMIN":
        return <DashboardPages.Admin canLoadData={canLoadData} />
      case "FILIAL":
        return <DashboardPages.Branch canLoadData={canLoadData} />
      case "FRANQUEADO":
        return <DashboardPages.Franchise canLoadData={canLoadData} />
      case "SINDICO":
        return <DashboardPages.Manager canLoadData={canLoadData} />
      case "PRESTADOR":
        return <DashboardPages.Provider canLoadData={canLoadData} />
      default:
        return null
    }
  }, [canLoadData, user?.profile])

  return (
    <S.Content>
      <PageContent />
    </S.Content>
  )
}

export default Dashboard
