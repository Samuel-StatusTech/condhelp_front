import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  display: grid;
  grid-template-columns: repeat(4, minmax(280px, 1fr));
  gap: 16px;
  width: 100%;

  @media (max-width: 1820px) {
    grid-template-columns: repeat(4, minmax(280px, 1fr));
  }

  @media (max-width: 1480px) {
    grid-template-columns: repeat(3, minmax(280px, 1fr));
  }

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }

  @media (max-width: 940px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`
