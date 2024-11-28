import styled from "styled-components"

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  padding: 20px;
  border-radius: 8px;
`

export const FaqTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const FaqBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`

export const Item = styled.div<{ $k: number }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.medium};

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

export const ItemId = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const ItemContent = styled.div<{ $opened: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${({ $opened, theme }) =>
    $opened ? theme.colors.neutral.soft : theme.colors.neutral.white};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s;
`

export const ItemHeader = styled.div<{ $opened: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;

  span {
    font-weight: ${({ $opened, theme }) => ($opened ? 600 : 400)};
    color: ${({ $opened, theme }) =>
      $opened ? theme.colors.neutral.dark : theme.colors.neutral.main};
  }
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
  padding: 10px 0;
  margin: 10px 0;
  border-radius: 4px;
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
