import styled from "styled-components"

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const GoogleItem = styled.div<{ $k: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  & > span {
    font-weight: 600;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};

    span {
      color: ${({ theme }) => theme.colors.neutral.white};
    }
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const EventName = styled.span`
  transition: color 0.3s;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const Agenda = styled.span`
  transition: color 0.3s;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const DateArea = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`

export const Date = styled.span`
  transition: color 0.3s;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const Hour = styled.span`
  transition: color 0.3s;
  color: ${({ theme }) => theme.colors.neutral.dark};
`
