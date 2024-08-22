import styled from "styled-components"

export const Wrapper = styled.div<{ $active: boolean; $k: number }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.medium};

  &:nth-child(1) {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral.medium};
  }

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 16px 0;
    text-decoration: none;
    filter: saturate(${({ $active }) => ($active ? 1 : 0)});
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    transition: filter 0.3s, opacity 0.3s;
    cursor: pointer;

    &:hover {
      filter: saturate(1);
      opacity: 1;
    }

    color: ${({ theme }) => theme.colors.brown.medium};
    svg {
      width: 24px;
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
