import styled from "styled-components"

export const Element = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 4px;
`

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
  width: 40%;
`
