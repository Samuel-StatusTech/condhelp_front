import styled from "styled-components"

export const Page = styled.main`
  min-height: 100svh;
  background-color: ${({ theme }) => theme.colors.neutral.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    padding: 16px;
    gap: 16px;
  }
`

export const Main = styled.div`
  display: flex;
  gap: 20px;
  max-width: 1920px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    gap: 16px;
  }
`

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 8px;
  max-width: 100%;
  overflow: hidden;

  &:has(.falseSubContentWrapper) {
    background-color: transparent;
    padding: 0;
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    border-radius: 8px;
    padding: 0px;
  }
`
