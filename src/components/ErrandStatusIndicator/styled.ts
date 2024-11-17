import styled from "styled-components"
import { TErrand } from "../../utils/@types/data/errand"

export const Area = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`

export const Indicador = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 8px;
`

export const IndicadorDot = styled.div<{ $status: TErrand["status"] }>`
  width: 9px;
  height: 9px;
  border-radius: 9px;
  background-color: ${({ $status, theme }) =>
    $status ? theme.colors.red.main : theme.colors.green.light};
`

export const IndicadorMessage = styled.span`
  color: ${({ theme }) => theme.colors.neutral.main};
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  background-color: ${({ theme }) => theme.colors.green.light};
  color: ${({ theme }) => theme.colors.neutral.white};
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 48px;
  cursor: pointer;
`
