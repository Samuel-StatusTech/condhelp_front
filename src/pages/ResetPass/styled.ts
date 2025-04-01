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
  gap: 96px;
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

  span {
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral.white};
  }
`

export const Subaction = styled.button`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.green.soft};
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

export const NewAccount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  span {
    font-size: 14px;
  }

  button {
    margin: 0;
  }
`

export const StepTitle = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.white};
  text-align: center;
  text-transform: uppercase;
`

export const StepDescription = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.yellow.light};
  text-align: left;

  label {
    color: ${({ theme }) => theme.colors.green.soft};
  }
`

export const RecaptchaArea = styled.div`
  border-radius: 2px;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  @media (max-width: 720px) {
    gap: 48px;
  }
`

export const RContent = styled.button`
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.white};
  }
`

export const RCheckbox = styled.div<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.neutral.white};
  color: ${({ theme }) => theme.colors.yellow.main};

  svg {
    width: 14px;
    height: 14px;
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: opacity 0.3s;
  }
`
