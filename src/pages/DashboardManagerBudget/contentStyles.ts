import styled from "styled-components"
import { TBudgetStatus } from "../../utils/@types/data/status"

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
  background-color: ${({ theme }) => theme.colors.neutral.white};
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

export const ButtonsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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

export const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
`

export const DetailName = styled.span`
  width: 110px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const DetailValue = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.dark};
`

export const ButtonsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

export const PrintArea = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

export const PrintMessage = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  span {
    flex: 1;
    color: ${({ theme }) => theme.colors.neutral.lightMain};
  }
`

export const RoundButton = styled.button`
  border: none;
  outline: none;

  background: none;
  background-color: #f4f5f7;
  min-width: 48px;
  height: 48px;
  border-radius: 48px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

  svg {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background-color: #e0e0e0;
  }
`

/*
 *
 *
 *
 *
 * Provider
 *
 *
 *
 *
 */

export const ProviderBrand = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`

export const LogoArea = styled.div`
  width: 120px;
  height: 82px;
  border-radius: 4px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const ContactInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Contact = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 12px;
    height: 12px;
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.green.light};
  }
`

export const StatusArea = styled.div<{ $status: TBudgetStatus }>`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({ $status, theme }) =>
    $status === "AGUARDANDO_SINDICO"
      ? theme.colors.yellow.dark
      : $status === "APROVADO_SINDICO" || $status === "CONTRATADO"
      ? theme.colors.green.medium
      : theme.colors.red.main};
`
