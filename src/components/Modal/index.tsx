import NewBudget from "./variations/NewBudget"

import { Dialog } from "@mui/material"

type Props = {
  visible: boolean
  onClose: () => void
  handleOp?: (op: string) => void
  children?: JSX.Element | JSX.Element[]
  role: TModals
  data: any
}

type TModals = "newBudget"

const Modal = (props: Props) => {
  const { visible, onClose, handleOp } = props

  const renderModalContent = () => {
    let el: any = null

    switch (props.role) {
      case "newBudget":
        el = (
          <NewBudget data={props.data} onClose={onClose} handleOp={handleOp} />
        )
        break
      default:
        break
    }

    return el
  }

  return <Dialog open={visible}>{renderModalContent()}</Dialog>
}

export default Modal
