import styled from "styled-components"

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
    font-size: 12px;
    color: ${({ theme }) => theme.colors.neutral.main};
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
      ? theme.colors.green
      : $status === "awaiting"
      ? theme.colors.yellow
      : theme.colors.red.main};
`

export const Graph = styled.div`
  display: flex;
  border-radius: 30px;
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
      ? theme.colors.green
      : $type === "awaiting"
      ? theme.colors.yellow
      : theme.colors.red.main};
  transition: width 0.3s;

  span {
    color: ${({ theme }) => theme.colors.neutral.white};
    font-weight: 600;
  }
`
