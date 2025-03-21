import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const BlocksArea = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
  }
`

export const BlockCols = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: fit-content;
`

export const Block = styled.div<{
  $white?: boolean
  $zIndex: number
  $mobileZIndex: number
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ $white, theme }) =>
    $white ? theme.colors.neutral.white : theme.colors.neutral.soft};
  box-shadow: 0 0 4px 6px rgba(0, 0, 0, 0.03);
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
  z-index: ${({ $zIndex }) => $zIndex};

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    z-index: ${({ $mobileZIndex }) => $mobileZIndex};
  }
`

export const BlockTitle = styled.span`
  color: ${({ theme }) => theme.colors.neutral.lightMain};
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`

export const GroupArea = styled.div`
  display: flex;
  gap: 64px;
  min-width: 100%;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
  }
`

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 100%;
  max-width: 520px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    max-width: unset;
  }
`

export const FormLine = styled.div<{ $k: number; $align?: string }>`
  display: flex;

  gap: 10px;
  align-items: ${({$align}) => $align ?? "flex-start"};
  max-width: 100%;
  z-index: ${({ $k }) => 10 - ($k + 1)};

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.slow +
    theme.animations.delays.main($k)}

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));

    align-items: unset;

    min-width: unset;
    max-width: unset;
    width: unset;
  }
`
