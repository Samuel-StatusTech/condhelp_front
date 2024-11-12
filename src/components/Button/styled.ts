import styled from "styled-components"

export const GoogleArea = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  outline: none;
  border: none;
  border-radius: 2px;
  padding: 10px 8px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: fit-content;
  margin: auto;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 2px 9px rgba(0, 0, 0, 0.3);
  }
`

export const Element = styled.button<{ $type: string; $outlined: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  outline: none;
  border: none;
  border-radius: 28px;
  padding: 9.5px 14px;
  background-color: ${({ $type, $outlined, theme }) =>
    $outlined
      ? "transparent"
      : $type === "main"
      ? theme.colors.yellow.dark
      : $type === "secondary"
      ? theme.colors.neutral.medium
      : $type === "tertiary"
      ? theme.colors.neutral.white
      : "transparent"};
  cursor: pointer;
`

export const Text = styled.span<{ $type: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $type, theme }) =>
    $type === "main" || $type === "outlined"
      ? theme.colors.green.dark
      : $type === "secondary"
      ? theme.colors.neutral.dark
      : "transparent"};
`
