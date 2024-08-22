import styled from "styled-components"

export const Element = styled.aside<{ $opened: boolean }>`
  position: sticky;
  top: 32px;
  max-height: calc(100svh - 64px);
  max-width: 240px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.brown.soft};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transition: margin-left 0.3s;

  & > svg {
    width: 135px;
    opacity: 0;
    ${({ theme }) =>
      theme.animations.types.fade +
      theme.animations.durations.slow +
      theme.animations.delays.main(6)}
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    position: absolute;
    z-index: 10;
    height: calc(100vh + 30px);
    margin: -20px;
    margin-left: ${({ $opened }) => ($opened ? 0 : -264)}px;
  }
`

export const BurguerWrapper = styled.div<{ $opened: boolean }>`
  position: absolute;
  top: -4px;
  right: 0;
  transform: translateX(
    ${({ $opened }) => ($opened ? "50%" : "calc(100% + 7px)")}
  );
  transition: transform 0.3s;
  background-color: ${({ theme }) => theme.colors.brown.soft};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
  border-radius: 200px;
  padding: 8px;
  z-index: 2;
  display: none;
  place-items: center;

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    display: grid;
  }
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`

export const UserControl = styled.div`
  width: 100%;
  gap: 16px;
  position: relative;
`

export const LoggedUserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  opacity: 0;
  ${({ theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.slow +
    theme.animations.delays.main(5)}
`

export const UserNameBox = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.brown.dark};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  padding: 4px;
  border-radius: 16px;
`

export const NameArea = styled.div<{ $turned: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  svg {
    transition: transform 0.3s;
    transform: rotate(${({ $turned }) => ($turned ? 180 : 0)}deg);
  }
`

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const DropBtn = styled.div`
  display: grid;
  place-items: center;
`

export const DropUserWrapper = styled.div`
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
  border-radius: 4px;
  overflow-y: auto;
  z-index: 10;

  &.visible {
    display: block;
  }
`

export const DropUserContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const DUItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.soft};
  }
`
