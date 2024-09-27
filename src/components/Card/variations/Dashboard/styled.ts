import styled from "styled-components"

export const Element = styled.div<{ $k?: number }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 4px;
  height: fit-content;
  padding: 20px;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeBottom +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const CardMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CardTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const CardNumber = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const RelativeData = styled.div<{ $state: "superavit" | "deficit" }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ $state, theme }) =>
    $state === "superavit" ? theme.colors.green.medium : theme.colors.red.main};

  & > svg {
    transform: rotate(${({ $state }) => ($state === "deficit" ? 180 : 0)}deg);
  }
`

export const RDPercentage = styled.span`
  font-size: 12px;
  font-weight: 700;

  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.neutral.lightMain};
    font-weight: 500;
  }
`

export const GraphArea = styled.div`
  align-self: flex-end;
`
