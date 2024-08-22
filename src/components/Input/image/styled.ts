import styled from "styled-components"

export const Box = styled.div<{ $hasContent: boolean }>`
  background-color: ${({ $hasContent, theme }) =>
    $hasContent ? "transparent" : theme.colors.neutral.medium};
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  position: relative;
  cursor: pointer;
`

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`

export const Image = styled.img`
  width: 100%;
  height: auto;
`

export const OptionsArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.18);
  filter: blur(0);
  opacity: 0;
  transition: opacity 0.3s, filter 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-around;

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
