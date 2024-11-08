import * as S from "./styled"

import { Icons } from "../../assets/icons/icons"

type Props = {
  userImage: string | null
  size?: string | number
}

const UserImageItem = ({ userImage, size }: Props) => {
  return (
    <S.Element $img={userImage} $size={size}>
      {!userImage && <Icons.User />}
    </S.Element>
  )
}

export default UserImageItem
