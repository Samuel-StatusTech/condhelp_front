import styled from "styled-components"

export const Page = styled.div`
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
  color: ${({ theme }) => theme.colors.neutral.dark};
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`

export const BlockRow = styled.span<{ $small?: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: flex-start;
  gap: 20px;
`

export const Urgent = styled.div`
  color: ${({ theme }) => theme.colors.red.main};
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
  }

  svg {
    width: 16px;
    width: 16px;
  }
`

export const DataResumeArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
`

export const DataInfo = styled.div<{ $small?: boolean }>`
  grid-column: span ${({ $small }) => ($small ? 1 : 2)};
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span ${({ $small }) => ($small ? 2 : 4)};
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

export const FileDownload = styled.a<{ $disabled: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.neutral.lightMain : theme.colors.green.medium};
  text-decoration: none;
  cursor: ${({ $disabled }) => ($disabled ? "unset" : "pointer")};

  &:hover {
    text-decoration: ${({ $disabled }) => ($disabled ? "unset" : "underline")};
  }
`

export const ContactInfoArea = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    grid-column: span 4;
  }
`

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  color: ${({ theme }) => theme.colors.neutral.lightMain};

  svg {
    width: 14px;
    height: 14px;
  }

  span {
    font-size: 14px;
    font-weight: 500;

    &.label {
      width: 70px;
    }

    &:not(.label) {
      color: ${({ theme }) => theme.colors.green.medium};
    }
  }
`

export const ContactDescriptionArea = styled.div`
  display: grid;
  align-items: end;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  & div:has(button) {
    grid-column: span 1;
  }

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    & div:has(button) {
      grid-column: span 4;
    }
  }
`
