import { useRef } from "react"
import { motion } from "framer-motion"

type Props = {
  value: number
  onChange: (v: number) => void
}

export default function AngleSlider({ value, onChange }: Props) {
  const dragAreaRef = useRef<HTMLDivElement | null>(null)
  const dragThumbRef = useRef<HTMLDivElement | null>(null)

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
        <div
          ref={dragAreaRef}
          style={{
            position: "absolute",
            width: "100%",
            height: "4px",
            backgroundColor: "#d1d5db",
            borderRadius: "9999px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 0.5rem",
          }}
        >
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "4px",
                height: "4px",
                backgroundColor: "black",
                borderRadius: "9999px",
              }}
            ></div>
          ))}
        </div>

        {/* Movable Knob */}
        <motion.div
          ref={dragThumbRef}
          drag="x"
          dragConstraints={{
            left: 0,
            right: dragAreaRef?.current?.clientWidth,
          }}
          style={{
            position: "absolute",
            width: "16px",
            height: "32px",
            backgroundColor: "black",
            borderRadius: "9999px",
          }}
          onDrag={(event, info) => {
            const baseSize = (dragAreaRef?.current as HTMLDivElement)
              ?.clientWidth

            const newPos =
              info.offset.x < 0
                ? value
                : info.offset.x > baseSize
                ? baseSize
                : info.offset.x

            const percentagePos = 180 / baseSize

            const newValue = percentagePos * newPos

            const v = +Number(newValue).toFixed(0)

            onChange(v)
          }}
        />
      </div>

      {/* Angle Label */}
      <div
        style={{ marginTop: "0.5rem", fontSize: "1.125rem", fontWeight: "600" }}
      >
        {value}°
      </div>
    </div>
  )
}
