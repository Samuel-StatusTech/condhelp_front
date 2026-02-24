import { Icons } from "../../../../assets/icons/icons"
import * as S from "./styled"

const Maintence = () => {
  return (
    <S.Element>
      <S.Header>
        <S.HeaderMain>
          <Icons.AiStars width={48} height={48} />
          <S.Title>Estamos preparando novidades!</S.Title>
        </S.HeaderMain>
      </S.Header>
      <S.Content>
        <S.Message>
          <span>
            A plataforma <strong>CONDHELP</strong> ficará temporariamente
            indisponível enquanto trabalhamos em melhorias importantes, tudo
            para oferecer uma experiência ainda mais simples, rápida e completa.
          </span>
        </S.Message>
        <S.Message>
          <span>
            Em caso de dúvidas durante esse período, entre em contato com a
            nossa equipe pelo email:{" "}
            <a href="mailto:suporte@condhelp.com">suporte@condhelp.com</a>
          </span>
        </S.Message>
        <S.Message>
          <span>Obrigado pela confiança e por fazer parte da CONDHELP.</span>
        </S.Message>
        <S.Message>
          <span>Voltaremos em breve com novidades! &#x2764;&#xfe0e;</span>
        </S.Message>
        <S.Message>
          <span>Equipe CONDHELP</span>
        </S.Message>
      </S.Content>
    </S.Element>
  )
}

export default Maintence
