import styled from "styled-components"

export const Element = styled.div<{ $k?: number }>`
  flex: 1;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeBottom +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}

  a {
    text-decoration: none;
    flex: 1;
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.neutral.white};
    border-radius: 4px;
    height: fit-content;
    padding: 20px;
    gap: 10px;
    color: ${({ theme }) => theme.colors.green.light};

    svg {
      width: 32px;
      height: 32px;
    }
  }
`

export const CardMain = styled.div`
  display: flex;
  flex-direction: column;
`

export const CardTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const CardDescription = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.neutral.main};
`
