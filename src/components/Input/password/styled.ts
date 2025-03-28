import styled from "styled-components"
import { FormField } from "../../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $gridSizes?: FormField["gridSizes"]
  $fixedWidth?: number
}>`
  flex: ${({ $gridSizes }) => $gridSizes?.big ?? 1};
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

export const InputWrapper = styled.div<{ $error?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding-right: 15px;
  background-color: ${({ $error, theme }) =>
    $error ? `rgba(255, 0, 0, 0.1)` : theme.colors.neutral.white};
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
  padding: 15px;
  border-radius: 10px;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.red.main : theme.colors.neutral.dark};
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
