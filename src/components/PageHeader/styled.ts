import styled from "styled-components"

export const Element = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.falseSubContentWrapper {
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.neutral.soft};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadows.default};
  }
`
