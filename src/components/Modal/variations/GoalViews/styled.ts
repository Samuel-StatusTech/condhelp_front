import styled from "styled-components"

export const Element = styled.div`
  border-radius: 4px;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  box-shadow: 0 6px 50px rgba(0, 0, 0, 0.18);
  min-width: 540px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  width: 100%;
`

export const Description = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const ListArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 18px 8px 10px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  max-height: 420px;
  overflow: auto;
`

export const List = styled.ul`
  gap: 48px;
`

export const PersonItem = styled.li`
  padding: 8px 16px;
  list-style: none;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.main};
  }
`
