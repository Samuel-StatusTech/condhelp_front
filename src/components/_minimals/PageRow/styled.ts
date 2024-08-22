import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
  }
`
