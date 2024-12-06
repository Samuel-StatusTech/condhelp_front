import styled from "styled-components"

export const Tr = styled.tr`
  border-radius: 8px;
  overflow: hidden;
  border-top: 10px solid ${({ theme }) => theme.colors.neutral.soft};
  border-bottom: 10px solid ${({ theme }) => theme.colors.neutral.soft};
`

export const Td = styled.td`
  height: 46px;
`
