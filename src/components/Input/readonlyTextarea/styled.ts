import styled from "styled-components"
import { FormField } from "../../../utils/@types/components/FormFields"

export const Wrapper = styled.div<{
  $gridSizes?: FormField["gridSizes"]
  $fixedWidth?: number
  $disabled?: boolean
}>`
  flex: ${({ $gridSizes }) => $gridSizes?.big ?? 1};
  display: flex;
  min-width: unset;
  overflow: hidden;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: opacity 0.3s;

  ${({ $fixedWidth }) =>
    $fixedWidth
      ? `
  min-width: ${$fixedWidth}px;
  max-width: ${$fixedWidth}px;
  width: ${$fixedWidth}px;
`
      : ""}

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
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

export const DataArea = styled.div`
  padding: 15px;
  height: auto;
  min-height: 64px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border: none;
  outline: none;
  min-width: unset;
  font-weight: 600;
  width: 100%;
  font-size: 14px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`
