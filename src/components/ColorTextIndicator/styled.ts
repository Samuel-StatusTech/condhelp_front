import styled from "styled-components"

export const Element = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 6px;
  padding: 6px 8px;
  transition: transform 0.3s, opacity 0.3s;
`

export const Dot = styled.div<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 9px;
  background-color: ${({ $color }) => $color};
`

export const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.main};
`
