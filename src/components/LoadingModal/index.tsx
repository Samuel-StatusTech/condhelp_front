import { getStore } from "../../store"

import { Dialog, DialogProps } from "@mui/material"

import lottieData from "../../assets/animations/loading.json"

/*
 *  Variations
 */

import Lottie from "lottie-react"

export type ModalProps = {
  width?: DialogProps["maxWidth"]
  visible: boolean
  onClose?: () => void
  handleOp?: (params?: any) => void | Promise<void>
  children?: JSX.Element | JSX.Element[]
  role: TModals
  data?: any
}

export type TModals =
  | "loading"
  | "newBudget"
  | "newErrand"
  | "successFeedback"
  | "confirmDelete"
  | "contactInfo"

const LoadingModal = () => {
  const { modal } = getStore()

  const { visible } = modal

  return (
    <div id={"modal"}>
      <Dialog
        open={visible}
        maxWidth={"sm"}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "none",
            backgroundColor: "transparent",
            padding: "10px",
          },
        }}
      >
        <Lottie animationData={lottieData} width={64} height={64} />
      </Dialog>
    </div>
  )
}

export default LoadingModal
