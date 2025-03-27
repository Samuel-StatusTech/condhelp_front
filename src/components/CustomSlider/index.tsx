import { useRef, useState } from "react"
import { motion } from "framer-motion"

import * as S from "./styled"

type Props = {
  value: number
  onChange: (v: number) => void
  range: number[]
  classifier?: string
  roundValue?: boolean
  nonZero?: boolean
}

export default function CustomSlider({
  value,
  onChange,
  range,
  classifier,
  roundValue,
  nonZero,
}: Props) {
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null)
  const dragAreaRef = useRef<HTMLDivElement | null>(null)

  const isPositive = range[0] > -1

  const [currentPoint, setCurrentPoint] = useState(value)
  const [xValue, setXValue] = useState(0)

  const renderBackTrack = () => {
    let content: JSX.Element | JSX.Element[] = []

    const bigDotsQnt = 11
    const smallDotsQnt = 4

    for (let bIndex = 1; bIndex <= bigDotsQnt; bIndex++) {
      content.push(<S.BigDot />)
      if (bIndex < bigDotsQnt) {
        for (let sIndex = 1; sIndex <= smallDotsQnt; sIndex++) {
          content.push(<S.SmallDot />)
        }
      }
    }

    return content
  }

  const applyZeroRule = (n: number) => {
    let res = 0

    if (nonZero) {
      res = n > 0 ? n : 1
    } else res = n

    return res
  }

  const getScaledValue = (newValue: number) => {
    let v = 0

    const sliderSize = sliderWrapperRef?.current?.clientWidth as number

    const divisor = isPositive
      ? (sliderSize as number) -
        (sliderWrapperRef?.current?.parentElement?.clientWidth as number) *
          0.125
      : sliderSize / 2

    if (newValue > 0) {
      const x = (range[1] / divisor) * newValue
      v = applyZeroRule(roundValue ? Math.round(x) : x)
    } else if (newValue < 0) {
      const x = (range[0] / divisor) * newValue
      v = -applyZeroRule(roundValue ? Math.round(x) : x)
    } else {
      v = applyZeroRule(range[0])
    }

    return v
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2.5rem",
      }}
    >
      {/* Slider Container */}
      <div
        style={{
          position: "relative",
          width: "90%",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Markers */}
        <S.SliderWrapper ref={sliderWrapperRef} $isPositive={isPositive}>
          <S.SliderMarker>
            <span>|</span>
            <span>
              {Math.round(value)}
              {classifier ?? ""}
            </span>
          </S.SliderMarker>
          <motion.div
            drag="x"
            dragConstraints={{
              left: isPositive
                ? -(
                    (sliderWrapperRef?.current?.clientWidth as number) -
                    (sliderWrapperRef?.current?.parentElement
                      ?.clientWidth as number) *
                      0.125
                  )
                : -(sliderWrapperRef?.current?.clientWidth as number) / 2,
              right: isPositive
                ? 0
                : (sliderWrapperRef?.current?.clientWidth as number) / 2,
            }}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              setCurrentPoint(0)
            }}
            onDrag={(_, info) => {
              if (currentPoint !== info.offset.x) {
                const shouldPlus = currentPoint > info.offset.x

                const diff = Math.abs(
                  shouldPlus
                    ? info.offset.x - currentPoint
                    : currentPoint - info.offset.x
                )

                const newValue = shouldPlus ? xValue + diff : xValue - diff

                const min = isPositive
                  ? 0
                  : -(sliderWrapperRef?.current?.clientWidth as number) / 2
                const max = isPositive
                  ? (sliderWrapperRef?.current?.clientWidth as number) -
                    (sliderWrapperRef?.current?.parentElement
                      ?.clientWidth as number) *
                      0.125
                  : (sliderWrapperRef?.current?.clientWidth as number) / 2

                const isBetweenRange = min <= newValue && newValue <= max

                if (isBetweenRange) {
                  setCurrentPoint(info.offset.x)

                  const scaledValue = getScaledValue(newValue)

                  setXValue(newValue)
                  onChange(scaledValue)
                } else {
                  if (newValue < min) {
                    const scaledValue = getScaledValue(Math.floor(min))

                    setXValue(Math.floor(min))
                    onChange(scaledValue)
                  } else if (newValue > min) {
                    const scaledValue = getScaledValue(Math.floor(max))

                    setXValue(Math.floor(max))
                    onChange(scaledValue)
                  }
                }
              }
            }}
          >
            <S.SliderTrack ref={dragAreaRef}>{renderBackTrack()}</S.SliderTrack>
          </motion.div>
        </S.SliderWrapper>
      </div>
    </div>
  )
}
