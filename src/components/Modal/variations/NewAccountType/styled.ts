import styled from "styled-components"

export const Element = styled.div`
  border-radius: 4px;
  padding: 14px 14px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  box-shadow: 0 6px 50px rgba(0, 0, 0, 0.18);
  min-width: 540px;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 36px;
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
  }
`

export const Bottom = styled.div`
  grid-column: span 12;
  padding-top: 48px;
  display: flex;
  justify-content: stretch;
`

export const ModalTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #232323;
  margin-top: 16px;
`

export const Message = styled.span<{ $bold?: boolean }>`
  font-size: 14px;
  font-weight: ${({ $bold }) => ($bold ? 600 : 300)};
  color: ${({ theme }) => theme.colors.neutral.dark};
  flex: 1;
  white-space: pre-line;
`

export const ProfileOption = styled.div<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 24px;
  border-radius: 4px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.green.medium : theme.colors.neutral.lightMain};
  transition: border-color 0.3s;
  padding: 12px 28px;
  cursor: pointer;
`

export const POIndicator = styled.div<{ $active: boolean }>`
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 28px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.green.medium : theme.colors.neutral.lightMain};
  transition: border-color 0.3s;

  &::after {
    content: "";
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    background-color: ${({ theme }) => theme.colors.green.medium};
    transition: opacity 0.3s;
  }
`

export const POLabel = styled.div``
