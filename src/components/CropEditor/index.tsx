import React, { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "../../utils/tb/images/canvas/condominium"

import "./styles.css"
import * as S from "./styled"
import CustomSlider from "../CustomSlider"

type Props = {
  imageSrc: string
  onSave: (newUrl: string) => void
  onCancel: () => void
}

const CropEditor = ({ imageSrc, onSave, onCancel }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)

  const [activeController, setActiveController] = useState("zoom")

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
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Área do editor */}
      <S.EditorAreaWrapper>
        <S.EditorArea>
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={1}
              rotation={0}
              aspect={16 / 9} // Mantenha o aspecto quadrado
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          )}
        </S.EditorArea>
      </S.EditorAreaWrapper>

      <S.ControllersArea>
        <S.ControllerUXArea>
          <CustomSlider
            value={zoom}
            onChange={setZoom}
            range={[1, 3]}
            classifier="x"
          />
        </S.ControllerUXArea>
        <S.ControllersOptionsArea>
          <S.ControllerOption
            $active={activeController === "zoom"}
            onClick={() => setActiveController("zoom")}
          >
            Zoom
          </S.ControllerOption>
          <S.ControllerOption
            $active={activeController === "rotate"}
            onClick={() => setActiveController("rotate")}
          >
            Girar
          </S.ControllerOption>
        </S.ControllersOptionsArea>
      </S.ControllersArea>
    </div>
  )
}

export default CropEditor
