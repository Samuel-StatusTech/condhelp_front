import GoalViews from "./variations/GoalViews"
import GoalFill from "./variations/GoalFill"
import GoalApprove from "./variations/GoalApprove"
import MemberPoints from "./variations/MemberPoints"
import OKRPoints from "./variations/OKRPoints"

import { Dialog } from "@mui/material"

type Props = {
  visible: boolean
  onClose: () => void
  handleOp?: (op: string) => void
  children?: JSX.Element | JSX.Element[]
  role: TModals
  data: any
}

type TModals =
  | "goalViews"
  | "goalFill"
  | "goalApprove"
  | "changingPoints"
  | "okrPoints"

const Modal = (props: Props) => {
  const { visible, onClose } = props

  const renderModalContent = ({ onClose }: any) => {
    let el: any = null

    switch (props.role) {
      case "goalViews":
        el = <GoalViews data={props.data} onClose={onClose} />
        break
      case "goalFill":
        el = <GoalFill data={props.data} onClose={onClose} />
        break
      case "goalApprove":
        el = <GoalApprove data={props.data} onClose={onClose} />
        break
      case "changingPoints":
        el = (
          <MemberPoints
            data={props.data}
            onClose={onClose}
            handleOp={props.handleOp as (op: string) => void}
          />
        )
        break
      case "okrPoints":
        el = (
          <OKRPoints
            data={props.data}
            onClose={onClose}
            handleOp={props.handleOp as (op: string) => void}
          />
        )
        break
      default:
        break
    }

    return el
  }

  return <Dialog open={visible}>{renderModalContent({ onClose })}</Dialog>
}

export default Modal
