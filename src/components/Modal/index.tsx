import { getStore } from "../../store"
import NewBudget from "./variations/NewBudget"

import { Dialog } from "@mui/material"
import NewErrand from "./variations/NewErrand"

export type ModalProps = {
  visible: boolean
  onClose?: () => void
  handleOp?: (params?: any) => void | Promise<void>
  children?: JSX.Element | JSX.Element[]
  role: TModals
  data?: any
}

export type TModals = "newBudget" | "newErrand"

const Modal = () => {
  const { modal, controllers } = getStore()

  const { visible, onClose, handleOp, children } = modal

  const handleClose = () => {
    onClose && onClose()
    controllers.modal.close()
  }

  const renderModalContent = () => {
    let el: any = null

    switch (modal.role) {
      case "newBudget":
        el = (
          <NewBudget
            data={modal.data}
            onClose={handleClose}
            handleOp={handleOp}
          />
        )
        break
      case "newErrand":
        el = (
          <NewErrand
            data={modal.data}
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

  return <Dialog open={visible}>{renderModalContent()}</Dialog>
}

export default Modal
