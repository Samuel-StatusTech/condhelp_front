import styled from "styled-components"
import { FormField } from "../../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{ $gridSizes?: FormField["gridSizes"] }>`
  grid-column: span
    ${({ $gridSizes }) => ($gridSizes ? $gridSizes?.big : "unset")};
  flex: ${({ $gridSizes }) => (!$gridSizes ? 1 : "unset")};
  display: flex;
  min-width: unset;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span
      ${({ $gridSizes }) => ($gridSizes ? $gridSizes?.small : "unset")};
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
  gap: 16px;
`

export const Option = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  span {
    white-space: nowrap;
    color: ${({ $checked, theme }) =>
      $checked ? theme.colors.neutral.dark : theme.colors.neutral.lightMain};
  }
`

export const Radio = styled.div<{ $checked: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  min-width: 24px;
  min-height: 24px;
  border-radius: 24px;
  border: 2px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.neutral.dark : theme.colors.neutral.medium};
  transition: background-color 0.3s;

  &::after {
    content: "";
    top: 3px;
    left: 3px;
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background-color: ${({ $checked, theme }) =>
      $checked ? theme.colors.neutral.dark : "transparent"};
    transition: background-color 0.3s;
  }
`
