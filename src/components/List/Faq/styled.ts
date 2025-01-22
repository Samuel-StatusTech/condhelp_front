import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:has(div:not(.buttonsArea):hover) {
    & > div:not(.buttonsArea) {
      /* background-color: ${({ theme }) => theme.colors.neutral.soft}; */
      opacity: 0.4;
    }
    & > div:hover {
      /* background-color: ${({ theme }) => theme.colors.neutral.white}; */
      opacity: 1;
      svg.delete {
        fill: ${({ theme }) => theme.colors.neutral.white};
      }
    }
  }
`

export const Item = styled.div<{ $k: number }>`
  display: flex;
  align-items: center;
  gap: 8px;

  transition: opacity 0.3s;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}

  &:hover {
    opacity: 1;
  }
`

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
`

export const BtnArea = styled.div<{ $turnIcon?: boolean }>`
  width: fit-content;
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding: 4px;

  svg {
    transform: rotate(${({ $turnIcon }) => ($turnIcon ? 180 : 0)}deg);
    transition: transform 0.3s;
  }
`

export const ItemId = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;
  overflow: hidden;
  padding: 0 10px;
`

export const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;
`

export const Input = styled.input`
  background: none;
  border: none;
  height: 100%;
  min-width: unset;
  width: 100%;
  flex: 1;
  outline: none;
`

export const ItemHeaderButtons = styled.div<{ $opened: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;

  svg {
    width: 18px;
    height: 18px;

    & div:has(svg.delete) {
      transition: opacity 0.3s;
      opacity: 0;
    }

    &:nth-child(2) {
      transition: transform 0.3s;
      transform: rotate(${({ $opened }) => ($opened ? 180 : 0)}deg);
    }
  }
`

export const ItemAnswerWrapper = styled.div<{ $opened: boolean }>`
  display: grid;
  grid-template-rows: ${({ $opened }) => Number($opened)}fr;
  transition: grid-template-rows 0.3s, height 0.3s;
`

export const ItemAnswerArea = styled.div`
  min-height: 0;
  overflow: hidden;
`

export const ItemAnswerContent = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 4px;
  margin: 10px 0;
  gap: 8px;
`

export const ItemAnswer = styled.textarea`
  width: 100%;

  resize: none;
  height: auto;
  border: none;
  outline: none;
  background: none;
`
