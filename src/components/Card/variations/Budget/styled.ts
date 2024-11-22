import styled from "styled-components"

export const Element = styled.div<{
  $k?: number
  $role?: "openedCalled" | "opened" | "running" | "runningSigned"
}>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  cursor: pointer;
  background-color: ${({ $role, theme }) => {
    let color = ""

    switch ($role) {
      case "opened":
        color = theme.colors.blue.cyan
        break
      case "openedCalled":
        color = theme.colors.red.dark
        break
      case "running":
        color = theme.colors.blue.purple
        break
      case "runningSigned":
        color = theme.colors.green.medium
        break

      default:
        color = theme.colors.neutral.main
        break
    }

    return color
  }};
  border-radius: 8px;
  align-self: stretch;
  padding: 20px;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const CardTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.dark};
  font-weight: 600;
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

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const BudgetNumber = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.white};
`

export const InfoItem = styled.span<{ $bold?: boolean }>`
  font-size: 14px;
  font-weight: ${({ $bold }) => ($bold ? 600 : 300)};
  color: ${({ theme }) => theme.colors.neutral.white};
`

export const ResumeArea = styled.div`
  display: flex;
  gap: 8px;
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
  }
`

export const DataResumeItem = styled.div<{
  $status: "approved" | "awaiting" | "rejected"
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.neutral.main};

    &:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
      color: ${({ $status, theme }) =>
        $status === "approved"
          ? theme.colors.green.light
          : $status === "awaiting"
          ? theme.colors.orange.main
          : theme.colors.red.main};
    }
  }
`

export const BottomCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`

export const DateArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.neutral.main};
  font-size: 14px;
`

export const AlertArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.neutral.white};
  font-size: 14px;
`
