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
  align-items: ${({ $fromForm }) => (!$fromForm ? "start" : "center")};
  flex-direction: ${({ $fromForm }) => (!$fromForm ? "column" : "row")};
  gap: 16px;
  cursor: pointer;
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const Radio = styled.div<{ $checked: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  width: 24px;
  height: 24px;
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

export const Input = styled.input`
  border-radius: 4px;
  border: none;
  outline: none;
  height: 100%;
  flex: 1;
`
