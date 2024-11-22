import * as S from "./styled"
import { Link, useNavigate } from "react-router-dom"

import { ReactComponent as Divider } from "../../assets/icons/dropdown.svg"

export type PPath = {
  title: string
  to?: string
  action?: () => void
}

type Props = {
  paths: PPath[]
}

const BreadCrumb = ({ paths }: Props) => {
  const navigate = useNavigate()

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: PPath
  ) => {
    e.preventDefault()
    path.action ? path.action() : path.to && navigate(path.to)
  }

  const renderLinks = () => {
    let content: JSX.Element[] = []

    paths.forEach((path, k) => {
      let block: JSX.Element[] = []

      if (path.to)
        block.push(
          <Link key={`path-${k}`} to={path.to} onClick={(e) => handleClick(e, path)}>
            {path.title}
          </Link>
        )
      else block.push(<span key={`title-${k}`}>{path.title}</span>)

      if (k < paths.length - 1)
        block.push(
          <div key={`divider-${k}`}>
            <Divider />
          </div>
        )

      content.push(
        <S.Block key={k} $k={k}>
          {block}
        </S.Block>
      )
    })

    return content
  }

  return <S.Area>{renderLinks()}</S.Area>
}

export default BreadCrumb
