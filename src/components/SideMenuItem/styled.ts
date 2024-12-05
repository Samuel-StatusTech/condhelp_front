import styled from "styled-components"

export const Wrapper = styled.div<{ $active: boolean; $k: number }>`
  border-radius: 4px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.neutral.soft : "transparent"};
  transition: background-color 0.3s;
  padding: 8px 5px;

  a,
  div {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    text-decoration: none;
    filter: saturate(${({ $active }) => ($active ? 1 : 0)});
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    transition: filter 0.3s, opacity 0.3s;

    color: ${({ theme }) => theme.colors.green.medium};
    svg {
      width: 24px;
    }
  }

  a {
    cursor: pointer;

    &:hover {
      filter: saturate(1);
      opacity: 1;
    }
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main($k * 0.6)}
`

export const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`
