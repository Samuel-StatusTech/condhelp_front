import styled from "styled-components"

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.medium};
  border-radius: 4px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
`

export const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  background: transparent;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.dark};
  opacity: 1;
  transition: opacity 0.3s;
`
