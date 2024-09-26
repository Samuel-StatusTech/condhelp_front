import styled from "styled-components"

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const NotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  padding: 12px 10px;
  border-radius: 4px;
`

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  button {
    padding: 4px;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
  }
`

export const Points = styled.span`
  color: ${({ theme }) => theme.colors.red.main};
  font-size: 12px;
`

export const Description = styled.span`
  color: ${({ theme }) => theme.colors.neutral.dark};
  font-size: 12px;
`

export const FooterData = styled.span`
  color: ${({ theme }) => theme.colors.neutral.main};
  font-size: 12px;
  opacity: 0.6;
`
