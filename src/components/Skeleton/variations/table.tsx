import * as S from "./styled"

type Props = {
  columns: number
}
const TableSkeleton = ({ columns }: Props) => {
  return (
    <S.Tr className="bone">
      {Array.from({ length: columns }).map((i, k) => (
        <S.Td key={k}></S.Td>
      ))}
    </S.Tr>
  )
}

export default TableSkeleton
