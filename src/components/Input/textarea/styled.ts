import styled from "styled-components"

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
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

export const Textarea = styled.textarea<{ $disabled?: boolean }>`
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ $disabled, theme }) =>
    !$disabled ? theme.colors.neutral.white : theme.colors.neutral.medium};
  border: none;
  outline: none;
  resize: vertical;
  border-radius: 4px;
  font-weight: 500;
`
