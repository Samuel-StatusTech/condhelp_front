import * as S from "./styled"

import { Icons } from "../../assets/icons/icons"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import Input from "../Input"
import Button from "../Button"

type Props = {
  search: string
  searchPlaceholder: string
  filters?: TFilter[]
  onFilterChange?: (filter: Partial<TFilter>) => void
  onSearchChange: (text: string) => void
  onSearch: () => Promise<void>
}

const SearchBlock = (props: Props) => {
  const {
    search,
    searchPlaceholder,
    filters,
    onFilterChange,
    onSearchChange,
    onSearch,
  } = props

  return (
    <S.Element>
      <S.SearchArea>
        <Icons.Search />
        <S.Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </S.SearchArea>

      {filters?.map((filter, fk) => (
        <Input.SearchSelect
          key={fk}
          field={filter.name}
          label={filter.label}
          options={filter.options}
          value={filter.value}
          onChange={onFilterChange}
          byKey={filter.byKey}
        />
      ))}

      <div style={{ width: "fit-content" }}>
        <Button text="Pesquisar" type="main" action={onSearch} />
      </div>
    </S.Element>
  )
}

export default SearchBlock
