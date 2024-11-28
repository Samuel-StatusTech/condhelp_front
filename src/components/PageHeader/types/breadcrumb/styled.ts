import styled from "styled-components"

export const PageIndicator = styled.div<{ $k: number }>`
  display: flex;
  align-items: center;
  gap: 8px;
  filter: saturate(0);

  & > svg,
  & > span {
    opacity: 0;
    ${({ theme }) =>
      theme.animations.types.fadeRight +
      theme.animations.durations.main +
      theme.animations.delays.main(-1)}
  }

  & > span {
    ${({ $k, theme }) => theme.animations.delays.main($k + 0.5)}
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
    font-size: 16px;
    font-weight: 600;
  }
`
