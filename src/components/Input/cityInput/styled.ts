import styled from "styled-components"
import { FormField } from "../../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $gridSizes?: FormField["gridSizes"]
  $fixedWidth?: number
}>`
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
    grid-column: span
      ${({ $gridSizes }) => $gridSizes?.small ?? $gridSizes?.big ?? "unset"};
    flex: unset;

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

export const Label = styled.label<{ $error?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.red.main : theme.colors.neutral.main};
  transition: color 0.3s;
  width: fit-content;
`

export const Input = styled.input<{ $error?: boolean }>`
  flex: 1;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.red.main : theme.colors.neutral.main};
  background-color: transparent;
  border: none;
  outline: none;
  min-width: unset;
  font-weight: 600;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;

  &::placeholder {
    color: ${({ $error, theme }) =>
      $error ? theme.colors.red.main : theme.colors.neutral.lightMain};
    transition: color 0.3s;
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`

export const Item = styled.div<{
  $k: number
  $error?: boolean
  $big?: boolean
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ $big }) => ($big ? 7 : 4)}px 20px;
  /* gap: 48px; */
  background-color: ${({ $error, theme }) =>
    $error ? `rgba(255, 0, 0, 0.1)` : theme.colors.neutral.white};
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
  max-height: 280px;
  overflow-y: auto;

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
