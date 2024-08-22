import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  width: 100%;
`

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  width: 100%;
`

export const GoalPoints = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.neutral.main};
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

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.main};
  }
`

export const Bottom = styled.div`
  padding-top: 48px;
  margin: auto;
`
