import { TCompany } from "../../../utils/@types/data/company"
import * as C from "../styled"

import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg"

type Props = {
  data: TCompany
  k: number
}

export const CompanyItem = ({ data, k }: Props) => {
  const handleEdit = () => {
    //
  }

  return (
    <C.Item $k={k}>
      <C.Data $w={8}>
        <C.Value>{`#${k}`}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.name}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.cnpj}</C.Value>
      </C.Data>
      <C.Data>
        <C.EditBtn onClick={handleEdit}>
          <EditIcon />
        </C.EditBtn>
      </C.Data>
    </C.Item>
  )
}
