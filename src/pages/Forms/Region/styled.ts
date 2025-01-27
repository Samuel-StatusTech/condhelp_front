import styled from "styled-components"

export const Buttons = styled.div<{ $alignEnd?: boolean }>`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: ${({ $alignEnd }) =>
    $alignEnd ? "flex-end" : "space-between"};

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`
