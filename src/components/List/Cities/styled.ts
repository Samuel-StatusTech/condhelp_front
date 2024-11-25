import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:has(div:not(.buttonsArea):hover) {
    & > div:not(.buttonsArea) {
      /* background-color: ${({ theme }) => theme.colors.neutral.soft}; */
      opacity: 0.4;
    }
    & > div:hover {
      /* background-color: ${({ theme }) => theme.colors.neutral.white}; */
      opacity: 1;
    }
  }
`

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
`
