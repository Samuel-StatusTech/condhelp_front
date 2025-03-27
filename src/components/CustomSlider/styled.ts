import styled from "styled-components"

const bigDotSize = 6
const smallDotSize = 3

export const BigDot = styled.div`
  width: ${bigDotSize}px;
  height: ${bigDotSize}px;
  border-radius: ${bigDotSize}px;
  background-color: ${({ theme }) => theme.colors.neutral.main};
`

export const SmallDot = styled.div`
  width: ${smallDotSize}px;
  height: ${smallDotSize}px;
  border-radius: ${smallDotSize}px;
  background-color: ${({ theme }) => theme.colors.neutral.lightMain};
`

export const SliderWrapper = styled.div<{ $isPositive?: boolean }>`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  height: 20px;
  /* padding-left: ${({ $isPositive }) => ($isPositive ? "50%" : 0)}; */

  &::before {
    content: "";
    width: 50px;
    height: inherit;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0px, -50%);
    z-index: 3;
    background: linear-gradient(90deg, rgba(244, 245, 247, 1), transparent);
  }

  &::after {
    content: "";
    width: 50px;
    height: inherit;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0px, -50%);
    z-index: 3;
    background: linear-gradient(90deg, transparent, rgba(244, 245, 247, 1));
  }

  & > div:nth-child(2) {
    margin-left: ${({ $isPositive }) => ($isPositive ? "50%" : 0)};

    & > div {
      min-width: fit-content;
    }
  }
`

export const SliderMarker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 20px;
  border-radius: 50%;
  z-index: 2;
  background-image: linear-gradient(
    90deg,
    rgba(244, 245, 247, 0.8),
    rgba(244, 245, 247, 1),
    rgba(244, 245, 247, 0.8)
  );
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
  pointer-events: none;

  span {
    transform: translateY(-1rem);
    font-weight: 300;

    &:nth-child(1) {
      font-size: 12px;
      transform: translate(-0.5px, -1.5rem);
    }
    &:nth-child(2) {
      font-size: 14px;
    }
  }
`

export const SliderTrack = styled.div`
  width: calc(100% + ${bigDotSize}px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: grab;
  gap: 10px;
  padding: 6px 0;
  margin: 0 -${bigDotSize / 2}px;
`
