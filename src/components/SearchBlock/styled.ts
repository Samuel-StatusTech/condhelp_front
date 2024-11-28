import styled from "styled-components"

export const Element = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
    align-items: center;
  }
`

export const SearchArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  gap: 16px;
  padding: 6px 10px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex: 3;
    min-width: 100%;
  }
`

export const Input = styled.input`
  flex: 1;
  min-width: unset;
  background: none;
  outline: none;
  border: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.main};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.lightMain};
  }
`

export const FiltersArea = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: 100%;
    flex-direction: column;
  }
`

export const ButtonWrapper = styled.div`
  width: fit-content;
`
