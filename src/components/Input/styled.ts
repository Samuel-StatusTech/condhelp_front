import styled from "styled-components"
import { FormField } from "../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{ $gridSizes?: FormField["gridSizes"] }>`
  grid-column: span ${({ $gridSizes }) => $gridSizes?.big ?? "unset"};
  display: flex;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span ${({ $gridSizes }) => $gridSizes?.small ?? "unset"};
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
