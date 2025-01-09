import styled from "styled-components"
import { FormField } from "../../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $hasTopSpace?: boolean
  $gridSizes?: FormField["gridSizes"]
  $fixedWidth?: number
}>`
  /* grid-column: span ${({ $gridSizes }) => $gridSizes?.big ?? "unset"}; */
  flex: ${({ $gridSizes }) => $gridSizes?.big ?? 1};
  display: flex;
  margin-top: ${({ $hasTopSpace }) => ($hasTopSpace ? "24px" : "unset")};

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
  align-items: center;
  gap: 8px;
  cursor: pointer;
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
  height: 24px;
  display: flex;
  align-items: center;
  padding: 3px;
  border-radius: 18px;
  transition: background-color 0.3s;
  position: relative;
`

export const Dot = styled.div<{ $state: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: ${({ $state, theme }) =>
    $state ? theme.colors.neutral.dark : theme.colors.neutral.medium};
  transition: background-color 0.3s, transform 0.3s;
  transform: translateX(${({ $state }) => ($state ? "calc(100% + 4px)" : "0")});
`
