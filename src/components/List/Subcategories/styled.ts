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

export const SubcategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  gap: 48px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;

  transition: opacity 0.3s;

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${({ theme }) => theme.colors.green.light};
    }
  }
`

export const SCName = styled.span``

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: space-between;
`

export const BtnArea = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
`
