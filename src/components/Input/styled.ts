import styled from "styled-components"
import { FormField } from "../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $gridSizes?: FormField["gridSizes"]
  $alignBottom?: boolean
}>`
  grid-column: span ${({ $gridSizes }) => $gridSizes?.big ?? "unset"};
  display: flex;
  align-self: ${({ $alignBottom }) => ($alignBottom ? "flex-end" : "unset")};

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span ${({ $gridSizes }) => $gridSizes?.small ?? "unset"};
  }
`

export const Area = styled.div<{ $elevation?: number }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  z-index: ${({ $elevation }) => $elevation ?? "unset"};
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

export const Limit = styled.div<{ $filled?: boolean }>`
  min-width: 100%;
  text-align: right;
  font-size: 14px;
  color: ${({ $filled, theme }) =>
    $filled ? theme.colors.red.main : theme.colors.neutral.lightMain};
`
