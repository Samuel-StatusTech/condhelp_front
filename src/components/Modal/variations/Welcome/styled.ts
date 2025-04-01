import styled from "styled-components"

export const Element = styled.div`
  padding: 48px 48px;
`

export const ModalTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #232323;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 100%;
  gap: 36px;

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.lightMain};
    font-weight: 400;
  }
`

export const ContentArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.colors.green.light};
`

export const Message = styled.span<{ $bold?: boolean }>`
  font-size: 14px;
  font-weight: ${({ $bold }) => ($bold ? 600 : 300)};
  color: ${({ theme }) => theme.colors.neutral.dark};
  /* color: ${({ $bold, theme }) =>
    $bold ? theme.colors.neutral.dark : theme.colors.neutral.dark}; */
  flex: 1;
  white-space: pre-line;
`

export const Bottom = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    align-items: center;
    flex-direction: column;
  }
`
