import React, { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "../../utils/tb/images/canvas/condominium"

import "./styles.css"

type Props = {
  imageSrc: string
  onSave: (newUrl: string) => void
  onCancel: () => void
}

const CropEditor = ({ imageSrc, onSave, onCancel }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback(
    async (_: any, croppedAreaPixels: any) => {
      const img = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
      if (typeof img === "string") onSave(img as string)
      else {
        // feedback error
      }
    },
    [imageSrc, onSave, rotation]
  )

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        padding: "16px",
        backgroundColor: "white",
        gap: "64px",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Área do editor */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          backgroundColor: "#f0f0f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={16 / 9} // Mantenha o aspecto quadrado
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
        />
      </div>

      {/* Controles */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
          marginTop: "16px",
        }}
      >
        {/* Controle de Zoom */}
        <div>
          <label style={{ fontWeight: "600", marginBottom: "4px" }}>Zoom</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  )
}

export default CropEditor
