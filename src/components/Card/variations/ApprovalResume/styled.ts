import styled from "styled-components"

export const Element = styled.div<{ $k?: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;
  height: fit-content;
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

export const DataResumeArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    order: 3;
    flex: 2;
    margin-top: 16px;
    justify-content: space-between;
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
      font-weight: 600;
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
`

export const GraphData = styled.div<{
  $size: number
  $type: "approved" | "awaiting" | "rejected"
}>`
  width: ${({ $size }) => $size}%;
  display: grid;
  place-items: center;
  background-color: ${({ $type, theme }) =>
    $type === "approved"
      ? theme.colors.green.light
      : $type === "awaiting"
      ? theme.colors.orange.main
      : theme.colors.red.main};
  transition: width 0.3s;

  span {
    color: ${({ theme }) => theme.colors.neutral.white};
    font-weight: 600;
  }
`
