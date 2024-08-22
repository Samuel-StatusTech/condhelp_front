import styled from "styled-components"

export const Page = styled.main`
  min-height: 100svh;
  background-color: ${({ theme }) => theme.colors.brown.dark};
  display: flex;
  gap: 16px;
  padding: 32px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    padding: 24px;
  }
`

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.brown.soft};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  max-width: 100%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    border-radius: 8px;
    padding: 0px;
  }
`
