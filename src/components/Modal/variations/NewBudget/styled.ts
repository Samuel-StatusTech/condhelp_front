import styled from "styled-components"

export const Element = styled.div`
  border-radius: 4px;
  padding: 14px 14px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  box-shadow: 0 6px 50px rgba(0, 0, 0, 0.18);
  min-width: 540px;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    border-radius: 0px;
    min-width: unset;
    width: 100%;
  }
`

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 20px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.08);
  border-radius: 4px;

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
  justify-content: space-between;
  align-items: center;
  flex: 1;
`

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.yellow.dark};
`

export const UserPoints = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const Content = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(12, minmax(0, 1fr));

  width: 100%;
  gap: 16px;
`

export const LoadingContainer = styled.div`
  position: absolute;
  z-index: 100;
  margin: -14px;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
`

export const Row = styled.div<{ $alignTop?: boolean }>`
  grid-column: span 12;

  display: flex;

  gap: 10px;
  align-items: ${({ $alignTop }) => ($alignTop ? "flex-start" : "center")};

  &.firstRow {
    & > div:nth-child(2) {
      margin-top: 12px;
    }
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));

    align-items: unset;

    min-width: unset;
    max-width: unset;
    width: unset;

    &.firstRow {
      display: flex;
      flex-direction: column-reverse;
      margin-top: 30px;
      gap: 30px;

      & > div:nth-child(2) {
        margin-top: -18px;
      }
    }
  }
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

export const Bottom = styled.div`
  grid-column: span 12;
  padding-top: 48px;
  display: flex;
  justify-content: stretch;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    padding-top: 0;
  }
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
