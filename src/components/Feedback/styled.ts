import styled from "styled-components"

export const Element = styled.div<{
  $type: "success" | "failure"
  $state: boolean
}>`
  display: flex;
  align-items: center;
  position: absolute;
  gap: 16px;
  border-radius: 6px;
  padding: 6px 8px;
  background-color: ${({ $type, theme }) =>
    $type === "success" ? theme.colors.green : theme.colors.red};
  top: 64px;
  left: 50%;
  transform: translate(-50%, ${({ $state }) => ($state ? 0 : "-120%")});
  opacity: ${({ $state }) => +$state};
  transition: transform 0.3s, opacity 0.3s;
`

export const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.white};
`
