import styled from "styled-components"

export const Element = styled.div`
  padding: 14px 14px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
`

export const HeaderMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: auto;
  overflow: hidden;

  max-height: 80svh;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    max-height: 80svh;
  }
`

export const Message = styled.div`
  padding: 16px 32px;
  margin: auto;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const Goodbye = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.main};
  text-align: center;
`

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
`
