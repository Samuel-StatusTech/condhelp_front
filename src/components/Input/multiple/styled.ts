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

export const Main = styled.div<{ $fromForm: boolean }>`
  padding: 10px;
  background-color: ${({ $fromForm, theme }) =>
    !$fromForm ? "transparent" : theme.colors.neutral.white};
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
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
