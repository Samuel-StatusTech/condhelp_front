import { useCallback, useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { getStore } from "../store"

type Props = {
  children?: JSX.Element | JSX.Element[]
}

const AuthRoute = ({ children }: Props) => {
  const { user } = getStore()

  const [checkedLogin, setCheckedLogin] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  const checkLogin = useCallback(() => {
    const is = !!user
    setIsLogged(is)
    setCheckedLogin(true)
  }, [user])

  useEffect(() => {
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return checkedLogin ? (
    isLogged ? (
      <Outlet key={"outall"} />
    ) : (
      <Navigate
        to={"/login"}
        replace={true}
        state={{
          originalPath: document.location.href,
        }}
      />
    )
  ) : null
}

export default AuthRoute
