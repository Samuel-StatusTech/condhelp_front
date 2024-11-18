import styled from "styled-components"

export const SelectArea = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const DataArea = styled.div<{ $disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral.dark};
  background-color: ${({ $disabled, theme }) =>
    !$disabled ? theme.colors.neutral.white : theme.colors.neutral.medium};
  cursor: ${({ $disabled }) => ($disabled ? undefined : "pointer")};
  transition: background-color 0.3s;
  padding: 15px;
  border-radius: 10px;

  svg {
    transition: transform 0.3s;
    fill: ${({ theme }) => theme.colors.neutral.dark};
    transform: rotate(0deg);
    width: 18px;
    height: 18px;

    path {
      fill: ${({ theme }) => theme.colors.neutral.dark};
      stroke: ${({ theme }) => theme.colors.neutral.dark};
    }
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

export const DatePickerWrapper = styled.div`
  position: absolute;
  visibility: hidden;
  width: 0;
`
