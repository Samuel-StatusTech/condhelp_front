import styled from "styled-components"

export const Area = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const Block = styled.div<{ $k: number }>`
  display: flex;
  align-items: center;
  gap: 6px;

  a,
  span {
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.dark};
  }

  a:hover {
    text-decoration: underline;
  }

  div {
    display: grid;
    place-items: center;

    svg {
      transform: rotate(-90deg);
    }
  }

  a,
  div {
    opacity: 0;
    ${({ $k, theme }) =>
      theme.animations.types.fadeRight +
      theme.animations.durations.main +
      theme.animations.delays.main($k)}
  }

  div {
    ${({ $k, theme }) =>
      theme.animations.durations.slow + theme.animations.delays.main($k - 0.5)}
  }
`
