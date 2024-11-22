import styled from "styled-components"

export const Box = styled.div<{
  $height: number
}>`
  min-width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s;
  position: relative;

  a,
  div {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      color: ${({ theme }) => theme.colors.neutral.main};
    }
  }

  a {
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.main};
  width: fit-content;
`
