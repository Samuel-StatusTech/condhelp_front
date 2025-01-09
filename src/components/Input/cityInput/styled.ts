import styled from "styled-components"
import { FormField } from "../../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $gridSizes?: FormField["gridSizes"]
  $fixedWidth?: number
}>`
  /* grid-column: span
    ${({ $gridSizes }) => ($gridSizes ? $gridSizes?.big : "unset")};
    flex: ${({ $gridSizes }) => (!$gridSizes ? 1 : "unset")}; */
  flex: ${({ $gridSizes }) => $gridSizes?.big ?? 1};
  display: flex;
  min-width: unset;
  position: relative;

  ${({ $fixedWidth }) =>
    $fixedWidth
      ? `
  min-width: ${$fixedWidth}px;
  max-width: ${$fixedWidth}px;
  width: ${$fixedWidth}px;
`
      : ""}

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    /* grid-column: span ${({ $gridSizes }) => $gridSizes?.small ?? "unset"}; */
    flex: ${({ $gridSizes }) => $gridSizes?.small ?? 1};

    min-width: unset;
    max-width: unset;
    width: unset;
  }
`

export const Area = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.main};
  width: fit-content;
`

export const Input = styled.input`
  flex: 1;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border: none;
  outline: none;
  min-width: unset;
  font-weight: 600;
  width: 100%;
  transition: background-color 0.3s;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`

export const Item = styled.div<{ $k: number }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px;
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

export const BtnArea = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding: 4px;
`

export const OptionsArea = styled.div<{ $visible?: boolean }>`
  display: none;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  background-color: ${({ theme }) => theme.colors.neutral.white};
  width: 100%;
  z-index: 2;
  padding: 6px;
  box-shadow: ${({ theme }) => theme.shadows.default};

  &.visible {
    display: flex;
  }
`

export const Option = styled.button`
  border: none;
  display: flex;
  transition: background-color 0.3s;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.yellow.main};
  }
`
