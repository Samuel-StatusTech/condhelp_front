import styled from "styled-components"

export const GreetingsArea = styled.div`
  display: flex;
  gap: 16px;

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutral.dark};
  }
`

export const Greetings = styled.div``

export const Main = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.dark};
  display: block;
`

export const GreetingsResume = styled.div`
  span.info {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutral.dark};
  }

  opacity: 0;
  ${({ theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.main(4)}
`
