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

export const ListTitle = styled.span`
  color: ${({ theme }) => theme.colors.neutral.lightMain};
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`

export const Item = styled.div<{ $k: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  gap: 48px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;

  transition: opacity 0.3s;

  svg {
    width: 24px;
    height: 24px;

    color: ${({ theme }) => theme.colors.green.light};
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const ItemName = styled.span``

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
`

export const BtnArea = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding: 4px;
`
