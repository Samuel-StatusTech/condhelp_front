import styled from "styled-components"

export const Element = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  background-color: ${({ theme }) => theme.colors.neutral.medium};
  border-radius: 8px;
`

export const NoContent = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral.main};
`
