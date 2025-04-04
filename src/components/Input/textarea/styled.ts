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

export const Label = styled.label<{ $error?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.red.main : theme.colors.neutral.main};
  transition: color 0.3s;
  width: fit-content;
`

export const Textarea = styled.textarea<{
  $disabled?: boolean
  $error?: boolean
  $nonEditable?: boolean
}>`
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ $error, $disabled, theme }) =>
    !$disabled
      ? $error
        ? `rgba(255, 0, 0, 0.1)`
        : theme.colors.neutral.white
      : theme.colors.neutral.medium};
  border: none;
  outline: none;
  resize: vertical;
  border-radius: 4px;
  font-weight: 500;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.red.main : theme.colors.neutral.main};
  transition: color 0.3s;
  pointer-events: ${({ $nonEditable }) => ($nonEditable ? "none" : "unset")};
  resize: ${({ $nonEditable }) => ($nonEditable ? "none" : "unset")};

  &::placeholder {
    color: ${({ $error, theme }) =>
      $error ? theme.colors.red.main : theme.colors.neutral.lightMain};
    transition: color 0.3s;
  }
`
