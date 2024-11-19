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

export const HeaderMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
`

export const ModalTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const CloseBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  padding: 7px;
  display: grid;
  place-items: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`
