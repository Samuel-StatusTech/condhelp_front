import styled from "styled-components"

export const Element = styled.div`
  border-radius: 4px;
  padding: 14px 14px;
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  box-shadow: 0 6px 50px rgba(0, 0, 0, 0.18);
  min-width: 540px;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    min-width: unset;
    width: 100%;
  }
`

export const HeaderSubInfo = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.lightMain};
  font-weight: 300;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 16px;

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.lightMain};
    font-weight: 400;
  }
`

export const ImageWrapper = styled.div<{
  $hasContent: boolean
  $height: number
}>`
  background-color: ${({ $hasContent, theme }) =>
    $hasContent ? "transparent" : theme.colors.neutral.medium};
  width: 100%;
  height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`

export const Image = styled.img`
  width: 100%;
  height: auto;
`

export const Row = styled.div`
  grid-column: span 12;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 16px;
`

export const TargetArea = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: ${({ theme }) => theme.colors.neutral.lightMain};

  span:nth-child(1) {
    font-weight: 600;
  }
`

export const Target = styled.span`
  /* font-size: 14px; */
`

export const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
`
