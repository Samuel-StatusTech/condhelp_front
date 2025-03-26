import { useRef, useState } from "react"
import { motion } from "framer-motion"

import * as S from "./styled"

type Props = {
  value: number
  onChange: (v: number) => void
  range: number[]
  classifier?: string
}

export default function CustomSlider({
  value,
  onChange,
  range,
  classifier,
}: Props) {
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null)
  const dragAreaRef = useRef<HTMLDivElement | null>(null)

  const [currentPoint, setCurrentPoint] = useState(value)

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
        <S.SliderWrapper ref={sliderWrapperRef}>
          <S.SliderMarker>
            <span>|</span>
            <span>
              {value}
              {classifier ?? ""}
            </span>
          </S.SliderMarker>
          <motion.div
            drag="x"
            dragConstraints={{
              left: -(sliderWrapperRef?.current?.clientWidth as number) / 2,
              right: (sliderWrapperRef?.current?.clientWidth as number) / 2,
            }}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              setCurrentPoint(0)
            }}
            onDrag={(_, info) => {
              const walked = Math.abs((currentPoint - info.offset.x) % 30)

              if (currentPoint !== info.offset.x && walked !== 0) {
                const shouldPlus = currentPoint > info.offset.x

                const diff = Math.abs(
                  shouldPlus
                    ? info.offset.x - currentPoint
                    : currentPoint - info.offset.x
                )

                const newValue = shouldPlus ? value + diff : value - diff

                const min =
                  -(sliderWrapperRef?.current?.clientWidth as number) / 2
                const max =
                  (sliderWrapperRef?.current?.clientWidth as number) / 2

                const isBetweenRange = min <= newValue && newValue <= max

                if (isBetweenRange) {
                  setCurrentPoint(info.offset.x)
                  onChange(newValue)
                } else {
                  if (newValue < min) onChange(Math.floor(min))
                  else if (newValue > min) onChange(Math.floor(max))
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
