import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 16px;
`

export const SubContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
`

export const BlockArea = styled.div<{ $k?: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 8px;
  max-width: 100%;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    border-radius: 8px;
  }
`

export const BlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 48px;
  flex-wrap: wrap;
`

export const BlockTitle = styled.div<{ $k?: number }>`
  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutral.dark};
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const BudgetsArea = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  overflow-x: auto;
  width: 100%;
`

export const ManagerBudgetsResumeArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const MBRMessage = styled.div`
  font-size: 14px;

  & > span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.green.medium};
  }
`

export const MBRDataArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const MBRItem = styled.div`
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

export const MBRDot = styled.div<{
  $status: "approved" | "awaiting" | "rejected"
}>`
  width: 9px;
  height: 9px;
  border-radius: 9px;
  background-color: ${({ $status, theme }) =>
    $status === "approved"
      ? theme.colors.green.medium
      : $status === "awaiting"
      ? theme.colors.yellow.main
      : theme.colors.red.main};
`

export const MBRText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const ShortcutsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
