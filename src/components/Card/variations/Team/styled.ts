import styled from "styled-components"

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const LighterItem = styled.div<{ $k: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.medium};
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 36px;
  }

  svg {
    width: 36px;
    height: 36px;
    filter: saturate(0);
  }
`

export const UserNameArea = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserName = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const UserPoints = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const ResumeArea = styled.div`
  display: flex;
  gap: 12px;
`

export const RData = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const Color = styled.div<{
  $color: "approved" | "awaiting" | "denied"
}>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ $color, theme }) =>
    $color === "approved"
      ? theme.colors.green
      : $color === "awaiting"
      ? theme.colors.yellow
      : theme.colors.red.main};
`

export const Legend = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};
`
