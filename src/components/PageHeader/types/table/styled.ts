import styled from "styled-components"

export const PageIndicator = styled.div<{ $k: number; $fullSize: boolean }>`
  flex: ${({ $fullSize }) => ($fullSize ? 1 : "unset")};
  display: flex;
  align-items: center;
  gap: 8px;
  filter: saturate(0);

  svg,
  span {
    opacity: 0;
    ${({ $k, theme }) =>
      theme.animations.types.fadeBottom +
      theme.animations.durations.main +
      theme.animations.delays.main($k)}
  }

  span {
    font-weight: 500;
    ${({ $k, theme }) => theme.animations.delays.main($k + 0.5)}
    width: ${({ $fullSize }) => ($fullSize ? "100%" : "unset")};
    text-align: ${({ $fullSize }) => ($fullSize ? "center" : "unset")};
  }
`

export const Button = styled.button<{ $k: number }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  outline: none;
  background: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral.dark};

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}

  svg,
  span {
    opacity: 0;
    ${({ $k, theme }) =>
      theme.animations.types.fadeLeft +
      theme.animations.durations.main +
      theme.animations.delays.main($k + 1)}
  }

  span {
    ${({ $k, theme }) => theme.animations.delays.main($k + 1.5)}
    font-weight: 600;
  }
`
