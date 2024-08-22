import styled from "styled-components"

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
  gap: 32px;
`

export const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const GroupArea = styled.div`
  display: flex;
  gap: 64px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
  }
`

export const GroupInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const GroupTitle = styled.span<{ $k: number }>`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brown.medium};

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.slow +
    theme.animations.delays.main($k)}
`

export const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Description = styled.span<{ $k: number }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.main};

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.slow +
    theme.animations.delays.main($k)}
`

export const List = styled.div`
  margin-top: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;

  ${({ theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.slow +
    theme.animations.delays.main(2)}
`

export const ListTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
`

export const ListItemsWrapper = styled.div`
  padding-right: 20px;
  overflow-y: auto;
  height: 100%;
  max-height: 360px;
`

export const ListItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const LItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const LIMain = styled.span`
  font-size: 14px;
`

export const LISecondary = styled.span`
  font-size: 12px;
  font-weight: 300;
`

// ### Form content ###

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 520px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    max-width: unset;
  }
`

export const FormLine = styled.div<{ $k: number; $length: number }>`
  display: flex;
  gap: 32px;
  align-items: center;
  z-index: ${({ $length, $k }) => ($length - $k > -1 ? $length - $k : 0)};

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.slow +
    theme.animations.delays.main($k)}
`

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: space-between;
`

export const BtnArea = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
`

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  flex: 1;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.white};
  }
`
