import styled from "styled-components"

export const Element = styled.div`
  padding: 14px 14px;
`

export const HeaderSubInfo = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
  font-weight: 300;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 100%;
  gap: 16px;

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.lightMain};
    font-weight: 400;
  }
`

export const ContentArea = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: ${({ theme }) => theme.colors.red.main};

  svg {
    width: 54px;
    height: 54px;
  }
`

export const Message = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.dark};
  flex: 1;
  white-space: pre-line;
`

export const Bottom = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    alignitems: center;
    flex-direction: column;
  }
`
