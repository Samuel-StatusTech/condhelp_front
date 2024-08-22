import styled from "styled-components"

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const LeaderItem = styled.div<{ $k: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  & > span {
    font-weight: 600;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.medium};
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
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

  svg {
    width: 36px;
    height: 36px;
    filter: saturate(0);
  }
`

export const UserNameArea = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const UserCompany = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};
`
