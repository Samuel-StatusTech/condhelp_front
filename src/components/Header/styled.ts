import styled from "styled-components"

export const Element = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.green.dark};
  border-radius: 8px;
  overflow: auto;
  max-width: 100%;

  & > svg {
    opacity: 0;
    ${({ theme }) =>
      theme.animations.types.fade +
      theme.animations.durations.slow +
      theme.animations.delays.main(12)}
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 36px;
`

export const MenuItem = styled.div<{ $k: number }>`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.green.soft};
    font-size: 14px;
    transition: color 0.3s;
    white-space: nowrap;

    &:hover {
      color: ${({ theme }) => theme.colors.neutral.white};
    }
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeBottom +
    theme.animations.durations.main +
    theme.animations.delays.main($k / 2)}
`
