import { getStore } from "../../store"

import { Dialog, DialogProps } from "@mui/material"

/*
 *  Variations
 */

import NewBudget from "./variations/NewBudget"
import NewErrand from "./variations/NewErrand"
import SuccessFeedback from "./variations/SuccessFeedback"
import DeleteConfirm from "./variations/DeleteConfirm"
import ContactInfo from "./variations/ContactInfo"
import LoadingModal from "../LoadingModal"
import EditBudget from "./variations/EditBudget"
import ReopenBudget from "./variations/ReopenBudget"
import ImageEditor from "./variations/ImageEditor"
import ResetPassword from "./variations/ResetPassword"
import WelcomeModal from "./variations/Welcome"

export type ModalProps = {
  bluredBack?: boolean
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
  | "editBudget"
  | "reopenBudget"
  | "newErrand"
  | "successFeedback"
  | "confirmDelete"
  | "contactInfo"
  | "imageEditor"
  | "resetPassword"
  | "welcome"

const Modal = () => {
  const { modal, controllers } = getStore()

  const {
    bluredBack,
    width,
    role,
    visible,
    data,
    onClose,
    handleOp,
    children,
  } = modal

  const handleClose = () => {
    onClose && onClose()
    controllers.modal.close()
  }

  const renderModalContent = () => {
    let el: any = null

    switch (role) {
      case "newBudget":
        el = <NewBudget data={data} onClose={handleClose} handleOp={handleOp} />
        break
      case "editBudget":
        el = (
          <EditBudget data={data} onClose={handleClose} handleOp={handleOp} />
        )
        break
      case "reopenBudget":
        el = (
          <ReopenBudget data={data} onClose={handleClose} handleOp={handleOp} />
        )
        break
      case "newErrand":
        el = <NewErrand data={data} onClose={handleClose} handleOp={handleOp} />
        break
      case "contactInfo":
        el = (
          <ContactInfo data={data} onClose={handleClose} handleOp={handleOp} />
        )
        break
      case "successFeedback":
        el = (
          <SuccessFeedback
            data={data}
            onClose={handleClose}
            handleOp={handleOp}
          />
        )
        break
      case "confirmDelete":
        el = (
          <DeleteConfirm
            data={data}
            onClose={handleClose}
            handleOp={handleOp}
          />
        )
        break
      case "imageEditor":
        el = (
          <ImageEditor data={data} onClose={handleClose} handleOp={handleOp} />
        )
        break
      case "resetPassword":
        el = (
          <ResetPassword
            data={data}
            onClose={handleClose}
            handleOp={handleOp as (newPass: string) => Promise<void>}
          />
        )
        break
      case "welcome":
        el = (
          <WelcomeModal
            data={data}
            onClose={handleClose}
            handleOp={handleOp as () => Promise<void>}
          />
        )
        break
      default:
        el = children
        break
    }

    return el
  }

  return role === "loading" ? (
    <LoadingModal />
  ) : (
    <div id={"modal"}>
      <Dialog
        open={visible}
        maxWidth={width}
        sx={{
          width: "100%",
          backdropFilter: bluredBack ? "blur(5px)" : undefined,
          "& .MuiPaper-root": {
            backgroundColor: "#F4F5F7",
            borderRadius: "16px",
            width: "100%",
          },
        }}
      >
        {renderModalContent()}
      </Dialog>
    </div>
  )
}

export default Modal
