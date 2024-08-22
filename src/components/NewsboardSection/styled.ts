import styled from "styled-components"

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    filter: saturate(0);
  }

  span {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutral.main};
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.neutral.main};
  }
`

export const FilterCheck = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.medium};

  svg {
    width: 14px;
  }
`

// News Section

export const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const NewsItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 12px;
  border-radius: 8px;
`

export const BannerArea = styled.div<{ $k: number }>`
  flex: 1;
  display: grid;
  place-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.neutral.medium};
  border-radius: 8px;
  height: 120px;

  img {
    width: 100%;
    height: auto;
  }

  &:has(> img) {
    display: flex;
    align-items: center;
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.slow +
    theme.animations.delays.main($k)}
`

export const NewsData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Date = styled.span<{ $k: number }>`
  font-size: 12px;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k + 2)}
`

export const Title = styled.span<{ $k: number }>`
  font-weight: 600;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k + 3)}
`

export const Message = styled.span<{ $k: number }>`
  font-size: 12px;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k + 4)}
`

export const ReadedInfo = styled.div<{ $k: number }>`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 24px;
    height: 24px;
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.slower($k)}
`

export const ReadCheckArea = styled.div<{ $k: number }>`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.slower($k)}
`

export const CheckArea = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.neutral.medium};
`
