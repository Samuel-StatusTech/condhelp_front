import styled from "styled-components"

export const GoalViewItem = styled.div<{ $k: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 4px;
  padding: 8px 10px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.medium};
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`
export const ViewsArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`
export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
