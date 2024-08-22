import styled from "styled-components"
import login_bg from "../../assets/images/login_bg.png"

export const Page = styled.main`
  min-height: 100svh;
  background-image: url(${login_bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 48px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 22px;
  width: 100%;
  max-width: 300px;
  transition: height 0.3s;
`

export const Subaction = styled.button`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.brown.light};
  text-align: center;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 26px;

  &:hover {
    text-decoration: underline;
  }
`

export const StepTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brown.soft};
  text-align: center;
`

export const StepDescription = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.brown.light};
  text-align: left;
`
