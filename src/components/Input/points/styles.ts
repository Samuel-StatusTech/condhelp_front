import styled from "styled-components"

export const SelectArea = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    max-width: 100%;
    gap: 12px;
    justify-content: space-between;
  }
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
