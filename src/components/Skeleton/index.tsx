import TableSkeleton from "./variations/table"

type Props = {
  role: "table"
  columns: number
  rows: number
}

const Skeleton = ({ role, columns, rows }: Props) => {
  const skeletonContent = () => {
    let content: JSX.Element[] = []

    switch (role) {
      case "table":
        content = Array.from({ length: rows }).map((_, k) => (
          <TableSkeleton key={k} columns={columns} />
        ))
        break
    }

    return content
  }

  return <>{skeletonContent()}</>
}

export default Skeleton
