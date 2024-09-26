import styled from "styled-components"

export const Element = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.green.dark};
  border-radius: 8px;
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 36px;
`

export const MenuItem = styled.div`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.green.soft};
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.neutral.white};
    }
  }
`
