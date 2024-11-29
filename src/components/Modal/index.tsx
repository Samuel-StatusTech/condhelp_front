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
  | "newBudget"
  | "newErrand"
  | "successFeedback"
  | "confirmDelete"
  | "contactInfo"

const Modal = () => {
  const { modal, controllers } = getStore()

  // const { role, visible, onClose, handleOp, children } = modal
  const { data, role, visible, onClose, handleOp, children } = {
    role: "contactInfo",
    visible: true,
    onClose: modal.onClose,
    handleOp: modal.handleOp,
    data: {
      title: "Excluir usuário",
    },
  } as ModalProps

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
      default:
        el = children
        break
    }

    return el
  }

  return (
    <div id={"modal"}>
      <Dialog
        open={visible}
        maxWidth={"xs"}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#F4F5F7",
            borderRadius: "16px",
          },
        }}
      >
        {renderModalContent()}
      </Dialog>
    </div>
  )
}

export default Modal
