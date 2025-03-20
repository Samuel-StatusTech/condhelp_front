import styled from "styled-components"

export const Element = styled.div<{ $k?: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* flex: 1; */
  width: 100%;
  max-width: 360px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;
  align-self: stretch;
  padding: 20px;
  cursor: pointer;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    max-width: calc(100vw - 104px);
  }
`

export const MainWrapper = styled.div`
  flex: 1;
`

export const ContentWrapper = styled.div`
  height: 100%;
`

export const Content = styled.div`
  height: 100%;
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
  flex: 1;
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};

  svg {
    width: 16px;
    height: 16px;
  }
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
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.red.main};
  font-size: 14px;
`
