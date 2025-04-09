import { getStore } from "../../store"

import { Dialog, DialogProps, styled } from "@mui/material"

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
import RejectCondominium from "./variations/RejectCondominium"
import SeeCondominiumRejection from "./variations/SeeCondominiumRejection"
import NewAccountType from "./variations/NewAccountType"
import { TUserProfile } from "../../utils/@types/data/user"

const ResponsiveDialog = styled(Dialog, {
  shouldForwardProp: (props) => props !== "isFullPage",
  // @ts-ignore
})<{ isFullPage?: boolean }>(({ theme, isFullPage }) => ({
  width: "100%",
  backdropFilter: "blur(5px)",
  "& .MuiPaper-root": {
    backgroundColor: "#F4F5F7",
    borderRadius: "16px",
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: isFullPage
    ? {
        borderRadius: 0,
        "& .MuiPaper-root": {
          borderRadius: 0,
          margin: 0,
          minHeight: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          "& > div": {
            minHeight: "100%",
            height: "100%",
          },
        },
      }
    : undefined,
}))

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
  | "rejectCondominium"
  | "seeCondominiumRejection"
  | "newAccountType"
  | "welcome"

const Modal = () => {
  const { modal, controllers } = getStore()

  const { width, role, visible, data, onClose, handleOp, children } = modal

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
      case "rejectCondominium":
        el = (
          <RejectCondominium
            data={data}
            onClose={handleClose}
            handleOp={
              handleOp as (condoId: number, reason: string) => Promise<void>
            }
          />
        )
        break
      case "seeCondominiumRejection":
        el = <SeeCondominiumRejection data={data} onClose={handleClose} />
        break
      case "newAccountType":
        el = (
          <NewAccountType
            data={data}
            handleOp={
              handleOp as unknown as (profile: TUserProfile) => Promise<boolean>
            }
            onClose={handleClose}
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
      <ResponsiveDialog
        open={visible}
        maxWidth={width}
        isFullPage={(
          ["newBudget", "editBudget", "imageEditor"] as TModals[]
        ).includes(modal.role)}
      >
        {renderModalContent()}
      </ResponsiveDialog>
    </div>
  )
}

export default Modal
