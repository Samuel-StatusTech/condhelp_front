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
  padding: 15px;
  border-radius: 10px;
  transition: background-color 0.3s;
  gap: 8px;

  svg {
    transition: transform 0.3s;
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


export const Placeholder = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const SelectedInfo = styled.span`
  font-size: 14px;
  font-weight: 300;
  font-weight: 600;
`

export const OptionsArea = styled.div<{
  $reverse?: boolean
  $elevation?: number
}>`
  display: none;
  position: absolute;
  ${({ $reverse }) => ($reverse ? `bottom` : `top`)}: calc(100% + 4px);
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.neutral.medium};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 2;

  &.visible {
    display: block;
  }
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  background-color: ${({ theme }) => theme.colors.neutral.white};
  transition: background-color 0.3s;
  padding: 8px;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.yellow.light};
  }
`


export const Checkbox = styled.div<{ $checked: boolean }>`
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.neutral.dark : theme.colors.neutral.white};
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.neutral.dark : theme.colors.neutral.lightMain};
  transition: background-color 0.3s;
  color: ${({ theme }) => theme.colors.neutral.white};
  display: grid;
  place-items: center;

  svg {
    width: 12px;
    height: 12px;
  }
`
