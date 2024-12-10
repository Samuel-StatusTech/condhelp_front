import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 16px;
`

export const ListName = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const BlockArea = styled.div<{ $k?: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 8px;
  max-width: 100%;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    border-radius: 8px;
  }
`

export const SubContent = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: flex-start;
  gap: 20px;
`

export const Column = styled.div<{ $small?: boolean }>`
  grid-column: span ${({ $small }) => ($small ? 3 : 6)};
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span ${({ $small }) => ($small ? 6 : 12)};
  }
`

export const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  box-shadow: 0 0 4px 6px rgba(0, 0, 0, 0.03);
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
`

export const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`

export const BlockTitle = styled.span`
  color: ${({ theme }) => theme.colors.neutral.lightMain};
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`

export const BlockRow = styled.span<{ $small?: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: flex-start;
  gap: 20px;
`

export const EmptyMessage = styled.div`
  grid-column: span 6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  width: 100%;
  flex: 1;

  span {
    color: ${({ theme }) => theme.colors.neutral.lightMain};
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span 12;
  }
`

export const CitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  box-shadow: ${({ theme }) => theme.shadows.default};
  cursor: pointer;
  padding: 6px 20px;

  span {
    flex: 1;
    color: ${({ theme }) => theme.colors.neutral.lightMain};
  }
`
