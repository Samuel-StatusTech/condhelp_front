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

export const Item = styled.div<{ $k: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  gap: 48px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;

  overflow: auto;

  transition: opacity 0.3s;

  svg {
    min-width: 24px;
    height: 24px;

    path {
      fill: ${({ theme }) => theme.colors.green.light};
    }
  }

  span {
    white-space: nowrap;
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const ItemData = styled.span`
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: space-between;
`

export const SeeMore = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.green.medium};
`

export const BtnArea = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
`
