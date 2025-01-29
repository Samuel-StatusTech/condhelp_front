import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 16px;
`

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PageHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`

export const PageTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutral.dark};
  font-weight: 600;
  margin: 0;
`
