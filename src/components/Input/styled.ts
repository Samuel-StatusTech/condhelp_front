import styled from "styled-components"
import { FormField } from "../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $gridSizes?: FormField["gridSizes"]
  $alignBottom?: boolean
  $fixedWidth?: number
  $zIndex?: number
}>`
  flex: ${({ $gridSizes }) => $gridSizes?.big ?? 1};
  display: flex;
  align-self: ${({ $alignBottom }) => ($alignBottom ? "flex-end" : "unset")};
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex ?? "unset"};

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

export const Area = styled.div<{ $elevation?: number }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  z-index: ${({ $elevation }) => 100 - ($elevation ?? 90)};
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const Box = styled.div<{ $state: boolean }>`
  background-color: ${({ $state, theme }) =>
    $state ? theme.colors.neutral.medium : theme.colors.neutral.white};
  width: 48px;
  height: 46px;
  display: flex;
  align-items: center;
  padding: 3px;
  border-radius: 18px;
  transition: background-color 0.3s;
  position: relative;
`

export const Limit = styled.div<{ $filled?: boolean; $error?: boolean }>`
  text-align: right;
  font-size: 14px;
  color: ${({ $filled, $error, theme }) =>
    $filled || $error ? theme.colors.red.main : theme.colors.neutral.lightMain};
  transition: color 0.3s;
`

export const ErrorMessage = styled.span<{ $visible?: boolean }>`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.red.main};
  width: fit-content;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s;
`
