import styled from "styled-components"

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
`

export const Area = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const Box = styled.div<{ $state: boolean }>`
  background-color: ${({ $state, theme }) =>
    $state ? theme.colors.neutral.medium : theme.colors.neutral.white};
  width: 48px;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 3px;
  border-radius: 18px;
  transition: background-color 0.3s;
  position: relative;
`

export const Dot = styled.div<{ $state: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: ${({ $state, theme }) =>
    $state ? theme.colors.neutral.dark : theme.colors.neutral.medium};
  transition: background-color 0.3s, transform 0.3s;
  transform: translateX(${({ $state }) => ($state ? "calc(100% + 4px)" : "0")});
`
