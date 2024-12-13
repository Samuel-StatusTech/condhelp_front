import * as S from "./styled"
import { TConfig } from "../../utils/system/table"
import { useState } from "react"
import { TDefaultList } from "../../api/types/responses"
import Skeleton from "../Skeleton"
import Input from "../Input"
import { systemOptions } from "../../utils/system/options"
import { Icons } from "../../assets/icons/icons"
import { TDefaultFilters } from "../../api/types/params"

type Props = {
  loading?: boolean
  searchData?: TDefaultList<any>
  config: TConfig
  data: any[]
  actions?: {
    [key: string]: (...props: any[]) => void | any
  }
  noHover?: boolean
  search?: string
  searchFields?: string[]
  expandComponent?: (item: any) => JSX.Element
  setSearchFilters?: React.Dispatch<React.SetStateAction<TDefaultFilters>>
}

const Table = ({
  loading,
  searchData,
  config,
  data,
  noHover,
  actions,
  search,
  searchFields,
  expandComponent,
  setSearchFilters,
}: Props) => {
  const onChangePaginationConfig = (field: string, value: any) => {
    if (setSearchFilters) {
      if (field === "size") {
        setSearchFilters((sf) => ({
          ...sf,
          [field]: value,
          page: 0,
        }))
      } else setSearchFilters((sf) => ({ ...sf, [field]: value }))
    }
  }

  const renderPagesItems = () => {
    let content: JSX.Element[] = []

    if (searchData && onChangePaginationConfig) {
      for (let i = 0; i < searchData.totalPages; i++) {
        content.push(
          <S.PageItem
            $disabled={false}
            $active={i === searchData.pageable.pageNumber}
            onClick={() => onChangePaginationConfig("page", i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
          </S.PageItem>
        )
      }
    }

    return content
  }

  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.RowItem>
            {config.columns.map((col, k) => (
              <S.TCol
                key={k}
                $size={col.size}
                $align={col.align}
                $width={col.width}
              >
                {col.title}
              </S.TCol>
            ))}
          </S.RowItem>
        </S.TableHead>
        <S.TableBody $noHover={noHover}>
          {loading ? (
            <Skeleton role="table" columns={config.columns.length} rows={10} />
          ) : (
            data
              .filter((item) => {
                let ok = false

                if (!!search) {
                  searchFields?.forEach((sf) => {
                    if (!ok) {
                      const v = sf.includes(".")
                        ? item[sf.split(".")[0]][sf.split(".")[1]]
                        : item[sf]

                      ok = String(v)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    }
                  })
                } else ok = true

                return ok
              })
              .map((item, k) => (
                <RowItem
                  key={k}
                  item={item}
                  config={config}
                  actions={actions}
                  expandComponent={expandComponent}
                />
              ))
          )}
        </S.TableBody>
      </S.Table>

      {searchData && (
        <S.PaginationWrapper>
          <S.Showinglabel>
            Exibindo <strong>{searchData?.numberOfElements}</strong> de{" "}
            {searchData?.totalElements}
          </S.Showinglabel>

          <S.Pages>
            <S.PageItem
              $disabled={searchData.first}
              $reverse={true}
              onClick={() => onChangePaginationConfig("page", 0)}
            >
              <Icons.PageControl />
            </S.PageItem>

            {searchData.totalElements > 0 && renderPagesItems()}

            <S.PageItem
              $disabled={searchData.last}
              onClick={() =>
                onChangePaginationConfig("page", searchData.totalPages - 1)
              }
            >
              <Icons.PageControl />
            </S.PageItem>
          </S.Pages>

          <Input.Select
            field="size"
            onChange={onChangePaginationConfig}
            options={systemOptions.pagination}
            value={String(searchData?.size)}
            reverse={true}
          />
        </S.PaginationWrapper>
      )}
    </S.Wrapper>
  )
}

type TRowItemProps = {
  item: any
  config: TConfig
  actions: any
  expandComponent?: any
}

const RowItem = (props: TRowItemProps) => {
  const { item, config, actions, expandComponent } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <>
      <S.RowItem className={isExpanded ? "highlighted" : ""}>
        {config.columns.map((col, k) => {
          let content: any = null

          const field = config.specialFields[col.field]

          content = field
            ? field(item, {
                data: {
                  size: col.size as number,
                },
                callbacks: actions,
              })
            : item[col.field]

          return (
            <S.ItemData
              key={k}
              $hasPointer={expandComponent && k !== config.columns.length - 1}
              $align={col.align}
              $width={col.width}
              onClick={
                expandComponent && k !== config.columns.length - 1
                  ? toggleExpand
                  : undefined
              }
            >
              <S.ItemContent
                $hasPointer={expandComponent && k !== config.columns.length - 1}
                $align={col.align}
                $width={col.width}
              >
                {content}
              </S.ItemContent>
            </S.ItemData>
          )
        })}
      </S.RowItem>
      {config.isExpandable && expandComponent && (
        <S.RowExpandable className={isExpanded ? "highlighted noBg" : "noBg"}>
          <S.REWrapper colSpan={6}>
            <S.REBox $visible={isExpanded}>
              <S.REContainer>{expandComponent(item)}</S.REContainer>
            </S.REBox>
          </S.REWrapper>
        </S.RowExpandable>
      )}
    </>
  )
}

export default Table
