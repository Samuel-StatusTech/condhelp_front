import styled from "styled-components"

export const Element = styled.div`
  border-radius: 4px;
  padding: 14px 14px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  box-shadow: 0 6px 50px rgba(0, 0, 0, 0.18);
  min-width: 540px;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`

export const Content = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(12, minmax(0, 1fr));

  width: 100%;
  gap: 16px;
`

export const ContentBox = styled.div`
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Bottom = styled.div`
  grid-column: span 12;
  padding-top: 48px;
  display: flex;
  justify-content: center;
`