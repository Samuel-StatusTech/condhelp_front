import styled from "styled-components"

export const FormContainer = styled.div`
  display: flex;
  width: 50%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    width: 100%;
  }
`
