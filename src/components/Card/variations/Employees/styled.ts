import styled from "styled-components"

export const SubTitle = styled.span`
  margin-bottom: 12px;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Employee = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.medium};
  }
`

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 36px;
  }

  color: ${({ theme }) => theme.colors.neutral.main};

  svg {
    width: 36px;
    height: 36px;
  }
`

export const UserNameArea = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const UserRole = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const ResumeArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const Position = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const Points = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral.dark};
`
