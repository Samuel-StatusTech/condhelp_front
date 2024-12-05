import styled from "styled-components"

export const Element = styled.div<{ $k?: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;
  height: fit-content;
  align-self: stretch;
  padding: 20px;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const CardTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const DataResumeArea = styled.div<{ $selfLine?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: ${({ $selfLine }) => ($selfLine ? "100%" : "unset")};

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    order: 3;
    flex: 2;
    margin-top: 16px;
    justify-content: space-between;

    flex-wrap: wrap;
    flex-direction: column;
  }
`

export const DataResumeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.main};

    &:nth-child(1) {
      font-weight: 400;
    }
  }
`

export const StatusColor = styled.div<{
  $status: "approved" | "awaiting" | "rejected"
}>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ $status, theme }) =>
    $status === "approved"
      ? theme.colors.green.light
      : $status === "awaiting"
      ? theme.colors.orange.main
      : theme.colors.red.main};
`

export const Graph = styled.div`
  display: flex;
  border-radius: 4px;
  height: 30px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
`

export const NullishBudgets = styled.span`
  width: 100%;
  text-align: center;
  align-self: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const GraphData = styled.div<{
  $size: number
  $type: string
}>`
  width: 0;
  width: ${({ $size }) => $size}%;
  display: grid;
  place-items: center;
  background-color: ${({ $type, theme }) =>
    $type === "approved"
      ? theme.colors.green.light
      : $type === "awaiting"
      ? theme.colors.orange.main
      : theme.colors.red.main};
  transition: width 1.3s ease-out;

  span {
    color: ${({ theme }) => theme.colors.neutral.white};
    font-weight: 600;
  }
`
