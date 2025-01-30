import styled from "styled-components"
import { FormField } from "../../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $gridSizes?: FormField["gridSizes"]
  $fixedWidth?: number
}>`
  flex: ${({ $gridSizes }) => $gridSizes?.big ?? 1};
  flex: ${({ $gridSizes }) => (!$gridSizes ? 1 : "unset")};
  display: flex;
  min-width: unset;
  overflow: hidden;

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

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.main};
  width: fit-content;
`

export const Main = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  gap: 10px;
  flex-wrap: wrap;
`

export const Option = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 400;
    transition: color 0.3s;
    color: ${({ $checked, theme }) =>
      $checked ? theme.colors.neutral.dark : theme.colors.neutral.lightMain};
  }
`

export const Checkbox = styled.div<{ $checked: boolean }>`
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.neutral.dark : theme.colors.neutral.white};
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.neutral.dark : theme.colors.neutral.lightMain};
  transition: background-color 0.3s;
  color: ${({ theme }) => theme.colors.neutral.white};
  display: grid;
  place-items: center;

  svg {
    width: 16px;
    height: 16px;
  }
`
