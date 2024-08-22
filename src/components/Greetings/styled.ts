import styled from "styled-components"

export const Element = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.brown.medium};
  cursor: pointer;
`

export const GreetingsArea = styled.div`
  display: flex;
  gap: 16px;
`

export const Light = styled.div<{ $color: "orange" | "green" }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.neutral.dark};
  width: 44px;
  height: 44px;
  border-radius: 12px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border-radius: 24px;
    background-color: ${({ $color }) =>
      $color === "orange" ? "#FFA903" : "#B5FF7B"};
    border: 1px solid
      ${({ $color }) => ($color === "orange" ? "#FFCD1B" : "#B3E48D")};
    box-shadow: 0 0 10px 0
      ${({ $color }) => ($color === "orange" ? "#FFA903" : "#B5FF7B")};
  }
`

export const Greetings = styled.div``

export const Main = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.dark};
  display: block;

  opacity: 0;
  ${({ theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main(1)}
`

export const GreetingsResume = styled.div`
  span.info {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutral.dark};
  }

  opacity: 0;
  ${({ theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main(2)}
`
