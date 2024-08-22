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
