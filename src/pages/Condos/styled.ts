import styled from "styled-components"

export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 16px;
`

export const EmptyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  grid-column: span 12;

  color: ${({ theme }) => theme.colors.neutral.main};

  & > svg {
    width: 62px;
    height: 62px;
  }

  & > span {
    font-size: 22px;
    white-space: nowrap;
    text-align: center;
    margin-bottom: 36px;
  }
`
