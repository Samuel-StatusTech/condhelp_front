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
  border-radius: 4px;
  padding: 10px;
  transition: background-color 0.3s;

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
  z-index: 10;

  &.visible {
    display: block;
  }
`

export const Option = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.white};
  transition: background-color 0.3s;
  padding: 8px;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brown.light};
  }
`
