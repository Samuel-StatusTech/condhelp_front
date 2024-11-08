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
  padding: ${({ $fromForm }) => ($fromForm ? 10 : 0)}px;
  background-color: ${({ $fromForm, theme }) =>
    $fromForm ? theme.colors.neutral.white : "transparent"};
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: ${({ $fromForm }) => ($fromForm ? "pointer" : "unset")};
`

export const CheckArea = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral.medium};
  display: grid;
  place-items: center;
`

export const Input = styled.input`
  padding: 15px;
  border-radius: 10px;
  border: none;
  outline: none;
  height: 100%;
  flex: 1;
`

export const OptionsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  padding: 4px 6px;
  border-radius: 4px;
`
