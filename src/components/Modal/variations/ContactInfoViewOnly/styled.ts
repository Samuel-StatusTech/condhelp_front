import styled from "styled-components"

export const Element = styled.div`
  padding: 14px 14px;
`

export const Content = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(12, minmax(0, 1fr));

  width: 100%;
  gap: 16px;
`

export const DataResumeArea = styled.div`
  grid-column: span 12;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
`

export const DataInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span 2;
  }
`

export const DITitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const DIValue = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const Row = styled.div`
  grid-column: span 12;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  width: 100%;
`

export const Bottom = styled.div`
  grid-column: span 12;
  padding-top: 48px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
`

export const PointsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const PointsControl = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  margin: auto;
  gap: 20px;
`

export const PointsNumber = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.white};
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 4px;
  width: 52px;
`

export const PointsButton = styled.div`
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  height: fit-content;
`
