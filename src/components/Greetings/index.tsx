import { getStore } from "../../store"
import * as S from "./styled"

const Greetings = () => {
  const { user } = getStore()

  const renderGreetingsMessage = () => {
    let content = <></>

    switch (user?.profile) {
      case "admin":
        content = (
          <S.GreetingsResume>
            <span>Painel Administrativo</span>
          </S.GreetingsResume>
        )
        break
      case "manager":
        content = (
          <S.GreetingsResume>
            <span>
              Olá {"Lorem"}, estes são seus pedidos de orçamentos em andamento:
            </span>
          </S.GreetingsResume>
        )
        break
      case "provider":
        content = (
          <S.GreetingsResume>
            <span>Olá {"Lorem"}, estes são os orçamentos em andamento:</span>
          </S.GreetingsResume>
        )
        break

      default:
        break
    }

    return content
  }

  return (
    <S.GreetingsArea>
      <S.Greetings>{renderGreetingsMessage()}</S.Greetings>
    </S.GreetingsArea>
  )
}

export default Greetings
