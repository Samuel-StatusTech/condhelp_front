import { getStore } from "../../store"
import * as S from "./styled"

const Greetings = () => {
  const { user } = getStore()

  const renderGreetingsMessage = () => {
    let content = <></>

    switch (user?.level) {
      case "master":
        content = (
          <S.GreetingsResume>
            Você está gerenciando <span className="info">{"11"}</span> líderes
          </S.GreetingsResume>
        )
        break
      case "leader":
        content = (
          <S.GreetingsResume>
            Você está atualmente na colocação
            <span className="info">{" #6"}</span>, com{" "}
            <span className="info">{"120"}</span> pontos.
          </S.GreetingsResume>
        )
        break
      case "employee":
        content = (
          <S.GreetingsResume>
            Seu rank na equipe é<span className="info">{" #6"}</span>, com{" "}
            <span className="info">{"120"}</span> pontos.
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
      {user?.level !== "master" && (
        <S.Light $color={user?.level === "leader" ? "orange" : "green"} />
      )}
      <S.Greetings>
        <S.Main>Olá, {user?.name}!</S.Main>
        {renderGreetingsMessage()}
      </S.Greetings>
    </S.GreetingsArea>
  )
}

export default Greetings
