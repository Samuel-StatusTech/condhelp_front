import styled from "styled-components"

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
`

export const Area = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 3.2px 32px rgba(0, 0, 0, 0.08);
`

export const ConfigArea = styled.div`
  display: flex;
  gap: 16px;
`

export const DataArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral.dark};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  cursor: pointer;
  border-radius: 4px;
  padding: 10px;

  svg {
    transition: transform 0.3s;
    fill: ${({ theme }) => theme.colors.neutral.dark};
    transform: rotate(0deg);
  }

  &.turnedIcon svg {
    transform: rotate(180deg);
  }
`

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};
  white-space: nowrap;
`

export const SelectedInfo = styled.span`
  font-size: 14px;
  font-weight: 300;
`

export const OptionsArea = styled.div<{ $reverse: boolean }>`
  display: flex;
  gap: 42px;
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

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const QuestionControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Control = styled.div`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  cursor: pointer;
`

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  flex: 1;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.white};
  }
`
