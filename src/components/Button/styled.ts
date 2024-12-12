import styled from "styled-components"

export const Element = styled.button<{
  $red?: boolean
  $type: string
  $outlined: boolean
  $fit?: boolean
  $k?: number
  $fromSidebar?: boolean
  $iconSize?: number
}>`
  ${({ $fit }) => ($fit ? `width: fit-content;` : `flex: 1;`)}
  min-width: ${({ $type, $fit }) =>
    ($type !== "tertiary" && $type !== "quaternary" && $type !== "green") ||
    !$fit
      ? `160px`
      : "unset"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  outline: none;
  border: ${({ $outlined, theme }) =>
    $outlined ? `2px solid ${theme.colors.green.light}` : "none"};
  border-radius: 28px;
  padding: 9.5px 14px;
  background-color: ${({ $type, $outlined, theme }) =>
    $outlined || $type === "quaternary"
      ? "transparent"
      : $type === "main"
      ? theme.colors.yellow.dark
      : $type === "secondary"
      ? theme.colors.neutral.medium
      : $type === "tertiary"
      ? theme.colors.neutral.white
      : $type === "green"
      ? theme.colors.green.medium
      : "transparent"};
  cursor: pointer;

  color: ${({ $red, $type, theme }) =>
    $red
      ? theme.colors.red.main
      : $type === "main"
      ? theme.colors.green.dark
      : $type === "secondary"
      ? theme.colors.neutral.dark
      : $type === "quaternary"
      ? theme.colors.neutral.dark
      : $type === "outlined" || $type === "tertiary"
      ? theme.colors.green.light
      : $type === "green"
      ? theme.colors.neutral.white
      : "transparent"};

  svg {
    width: ${({ $iconSize }) => $iconSize ?? 24}px;
    height: ${({ $iconSize }) => $iconSize ?? 24}px;
  }

  ${({ $k, theme }) =>
    $k
      ? "opacity: 0;" +
        theme.animations.types.fadeTop +
        theme.animations.durations.main +
        theme.animations.delays.main($k)
      : ""}

  &:not(:disabled):hover span {
    text-decoration: ${({ $type }) =>
      $type === "quaternary" ? "underline" : "unset"};
  }

  transition: background-color 0.3s;

  &:disabled {
    color: ${({ $type, theme }) =>
      $type === "green" ? theme.colors.neutral.lightMain : "currentColor"};
    background-color: ${({ $fromSidebar, $type, theme }) =>
      $fromSidebar
        ? theme.colors.neutral.medium
        : $type === "quaternary"
        ? "transparent"
        : theme.colors.neutral.medium};
    cursor: unset;

    opacity: ${({ $type }) => ($type === "quaternary" ? 0.5 : 1)};
    filter: saturate(0);
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: ${({ $type, $fit }) =>
      $type !== "tertiary" || !$fit ? `100px` : "unset"};

    svg {
      min-width: 20px;
      height: 20px;
    }
  }
`

export const Text = styled.span<{ $type: string; $greenText?: boolean }>`
  font-size: 14px;
  font-weight: ${({ $type }) => ($type === "quaternary" ? 400 : 600)};
  color: ${({ $greenText, theme }) =>
    $greenText ? theme.colors.green.medium : "currentColor"};
`
