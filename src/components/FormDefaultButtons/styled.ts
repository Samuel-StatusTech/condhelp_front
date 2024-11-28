import styled from "styled-components"

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`

export const BtnArea = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
`
