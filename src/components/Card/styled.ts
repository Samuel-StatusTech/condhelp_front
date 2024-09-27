import styled from "styled-components"

export const Element = styled.div<{ $k?: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;
  height: fit-content;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const HTop = styled.div<{ $noHover?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: ${({ $noHover }) => ($noHover ? "unset" : "pointer")};
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex: 2;
    flex-wrap: wrap;
  }
`

export const HPart = styled.div<{ $k: number; $expanded?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-weight: 600;
    font-size: ${({ theme }) => theme.colors.neutral.main};
  }

  svg {
    transform: rotate(${({ $expanded }) => ($expanded ? "180" : "0")}deg);
    transition: transform 0.3s;
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main($k + 1)}

  &:nth-child(2) {
    ${({ $k, theme }) => theme.animations.delays.main($k + 2)}
  }
`

export const MainWrapper = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $expanded }) => ($expanded ? 1 : 0)}fr;
  overflow: hidden;
  transition: grid-template-rows 0.3s;
`

export const ContentWrapper = styled.div`
  min-height: 0;
`

export const Content = styled.div`
  padding: 5px 0 10px;
  display: flex;
  flex-direction: column;
`
