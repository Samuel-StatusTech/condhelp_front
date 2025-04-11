import styled from "styled-components"

export const Element = styled.div`
  border-radius: 4px;
  padding: 14px 14px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  box-shadow: 0 6px 50px rgba(0, 0, 0, 0.18);
  min-width: 540px;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`

export const LoadingContainer = styled.div`
  position: absolute;
  z-index: 100;
  margin: -14px;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`

export const HeaderDefault = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const HeaderMain = styled.div<{ $bigMobileLogo?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    & > svg.logo {
      width: ${({ $bigMobileLogo }) => ($bigMobileLogo ? 42 : 32)}px;
      height: ${({ $bigMobileLogo }) => ($bigMobileLogo ? 42 : 32)}px;
    }
  }
`

export const ModalTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.dark};
  text-transform: uppercase;
`

export const CloseBtn = styled.button<{ $hideOnMobile?: boolean }>`
  border: none;
  outline: none;
  background: none;
  display: flex;
  cursor: pointer;

  svg {
    transform: translateY(-4px);
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? "none" : "flex")};
  }
`
