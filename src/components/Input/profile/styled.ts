import styled from "styled-components"

export const Box = styled.div<{ $hasContent: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
`

export const ImageWrapper = styled.div`
  position: relative;
  flex: 1;
`

export const ImageContent = styled.div`
  width: 100%;
  max-width: 120px;
  height: 120px;
  border-radius: 120px;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.neutral.medium};
`

export const Image = styled.img`
  min-height: 100%;
  max-height: 120%;
  width: auto;
  max-width: 120%;
`

export const ButtonsArea = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    backdrop-filter: blur(6px);
    opacity: 1;
  }
`

export const Button = styled.button`
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  outline: none;

  span {
    font-weight: 500;
  }
`
