import styled from "styled-components"

export const Wrapper = styled.aside<{ $opened: boolean }>`
  position: sticky;
  top: 20px;
  max-height: calc(100svh - 112px - 40px - 20px - 20px);
  max-width: 240px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: margin-left 0.3s;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    position: fixed;
    z-index: 10;
    height: calc(100vh + 30px);
    min-height: 100vh;
    margin: -20px;
    margin-left: ${({ $opened }) => ($opened ? 0 : -264)}px;
  }
`

export const MenuArea = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 8px;

  & > svg {
    width: 135px;
    opacity: 0;
    ${({ theme }) =>
      theme.animations.types.fade +
      theme.animations.durations.slow +
      theme.animations.delays.main(6)}
  }
`

export const ButtonWrapper = styled.div`
  min-width: 100%;
  height: fit-content;
  display: flex;
`

export const BurguerWrapper = styled.div<{ $opened: boolean }>`
  position: absolute;
  top: 12px;
  right: -12px;
  transform: translateX(
    ${({ $opened }) => ($opened ? "calc(50% - 12px)" : "calc(100% + 7px)")}
  );
  transition: transform 0.3s;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
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
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.medium};
  padding-top: 24px;
`

export const UserControl = styled.div`
  width: 100%;
  gap: 16px;
  position: relative;
`

export const LoggedUserArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  opacity: 0;
  ${({ theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.slow +
    theme.animations.delays.main(5)}
`

export const UserProfile = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.neutral.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  width: 75px;
  height: 75px;
  overflow: hidden;
  display: grid;
  place-items: center;

  border-radius: 75px;

  img,
  svg {
    min-width: 100%;
    min-height: 100%;
  }
`

export const NameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.neutral.main};
  font-size: 16px;
  font-weight: 600;
`

export const UserRole = styled.span`
  color: ${({ theme }) => theme.colors.green.medium};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`
