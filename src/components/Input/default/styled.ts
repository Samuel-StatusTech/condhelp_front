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

export const Input = styled.input`
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border: none;
  outline: none;
  min-width: unset;
  font-weight: 600;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`
