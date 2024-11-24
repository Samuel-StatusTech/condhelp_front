import { useState } from "react"
import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"

import Button from "../../../Button"
import { TErrand } from "../../../../utils/@types/data/errand"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../_minimals/Divider"

type Props = {
  data: TErrand
  onClose: () => void
  handleOp?: () => void
}

const Errand = ({ data, onClose, handleOp }: Props) => {
  const [form, setForm] = useState({
    unview: false,
  })

  const handleSubmit = () => {
    // TODO: check errors

    if (handleOp) handleOp()

    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>{data?.title}</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
          <S.HeaderSubInfo>
            {getDateStr(new Date(), "dmy")} - {getDateStr(new Date(), "time")}
          </S.HeaderSubInfo>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        {data.content.image && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <S.ImageWrapper $hasContent={true} $height={140}>
              <S.Image src={data.content.image} alt="" />
            </S.ImageWrapper>
          </div>
        )}

        <p
          dangerouslySetInnerHTML={{
            __html: data?.content.message.replace(/\n/g, "<br/>") ?? "",
          }}
        ></p>

        <S.Bottom>
          <Input.Multiple
            field="unview"
            // label="As informações estão corretas"
            value={form.unview ? ["unview"] : []}
            onChange={() => setForm({ unview: !form.unview })}
            options={[
              { key: "unview", value: "As informações estão corretas" },
            ]}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default Errand
