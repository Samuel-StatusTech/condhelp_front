import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const Message = styled.div`
  max-width: 390px;
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.neutral.main};
    font-size: 12px;

    &:nth-child(1) {
      font-weight: 600;
    }
  }
`
