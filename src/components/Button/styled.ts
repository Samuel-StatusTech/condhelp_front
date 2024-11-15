import styled from "styled-components"

export const Element = styled.button<{
  $type: string
  $outlined: boolean
  $fit?: boolean
  $k?: number
}>`
  ${({ $fit }) => ($fit ? `width: fit-content;` : `flex: 1;`)}
  min-width: ${({ $type, $fit }) =>
    $type !== "tertiary" || !$fit ? `160px` : "unset"};
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
      : "transparent"};
  cursor: pointer;

  color: ${({ $type, theme }) =>
    $type === "main"
      ? theme.colors.green.dark
      : $type === "secondary"
      ? theme.colors.neutral.dark
      : $type === "quaternary"
      ? theme.colors.neutral.dark
      : $type === "outlined" || $type === "tertiary"
      ? theme.colors.green.light
      : "transparent"};

  svg {
    width: 24px;
    height: 24px;
  }

  ${({ $k, theme }) =>
    $k
      ? "opacity: 0;" +
        theme.animations.types.fadeTop +
        theme.animations.durations.main +
        theme.animations.delays.main($k)
      : ""}

  &:hover span {
    text-decoration: ${({ $type }) =>
      $type === "quaternary" ? "underline" : "unset"};
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

export const Text = styled.span<{ $type: string }>`
  font-size: 14px;
  font-weight: ${({ $type }) => ($type === "quaternary" ? 400 : 600)};
`
