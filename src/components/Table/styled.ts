import styled from "styled-components"

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const TableControl = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    flex-direction: column;
    gap: 12px;
  }
`

export const SearchArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
  background: ${({ theme }) => theme.colors.neutral.white};
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.08);

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    width: 100%;
  }
`

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral.main};
  padding: 10.5px 12px;
`

export const SearchBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.neutral.white};
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  border: none;
  outline: none;

  svg {
    max-width: 24px;
    max-height: 24px;
  }
`

export const FiltersArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    width: 100%;
    justify-content: space-between;
  }
`

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.neutral.main};
  }
`

export const FilterCheck = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.medium};

  svg {
    width: 14px;
  }
`
// #
// #
// #
// #
// #
// #
// # Table
// #
// #
// #
// #
// #
// #

export const TableWrapper = styled.div`
  max-width: 100%;
  overflow: auto;
`
export const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.thead`
  width: 100%;
`

export const TH = styled.th<{
  $k: number
  $qt: number
  $hasProfile?: boolean
  $w?: number
  $wp?: string
}>`
  width: ${({ $w, $wp, $qt }) => ($w ? `${$w}px` : $wp ?? `${100 / $qt - 1}%`)};
  padding: 0px 20px;

  &:nth-child(1) {
    ${({ $hasProfile }) => ($hasProfile ? `padding-left: 76px;` : "")}
    width: fit-content;
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fade +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const ColControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  span {
    font-weight: normal;
    white-space: nowrap;
  }
`

export const TableList = styled.tbody`
  width: 100%;
  border-top: 10px solid transparent;
`

// Table Content
export const Item = styled.tr<{ $k: number }>`
  border-radius: 8px;
  border-top: 10px solid ${({ theme }) => "transparent"};
  border-bottom: 10px solid ${({ theme }) => "transparent"};
  transition: background-color 0.3s;
  cursor: pointer;

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}

  td {
    background-color: ${({ theme }) => theme.colors.neutral.white};
    overflow: hidden;
  }

  td:nth-child(1) {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  td:nth-last-child(1) {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

export const UserNameBox = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.yellow.dark};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  padding: 4px;
  width: fit-content;
  border-radius: 16px;
`

export const Data = styled.td<{ $w?: number; $wp?: number }>`
  width: ${({ $w, $wp }) => ($w ? `${$w}px` : `${$wp ?? 24}%`)};
  padding: 12px 20px;

  &:nth-last-child(1) {
    width: auto;

    display: flex;
    justify-content: flex-end;

    button {
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }
  }
`

export const Profile = styled.img``

export const Value = styled.div``

export const LevelIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const LevelFlag = styled.div<{ $level?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ $level, theme }) =>
    $level === "master"
      ? theme.colors.yellow.dark
      : $level === "leader"
      ? theme.colors.yellow.dark
      : theme.colors.yellow.dark};
`

export const LevelName = styled.span``

export const EditBtn = styled.button`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  filter: saturate(0.6);
`

// ---------------------

export const TableHead = styled.thead`
  border-collapse: collapse;
`

export const TCol = styled.th<{
  $size?: string | number
  $align?: string
  $width?: string
}>`
  text-align: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  padding: 12px;
  width: ${({ $width }) => $width ?? "unset"};
  color: ${({ theme }) => theme.colors.neutral.main};
  font-weight: 400;
`

export const TableBody = styled.tbody<{ $noHover?: boolean }>`
  border-collapse: collapse;

  tr {
    transition: background-color 0.3s, opacity 0.3s;

    &:not(.noHover):hover {
      .actions-area {
        opacity: 1;
      }
    }

    &.noBg,
    &.noBg:hover {
      background-color: transparent;
    }
  }

  &:has(.highlighted) {
    tr:not(.highlighted):not(.normal) {
      opacity: 0.2;
    }
  }
`

export const RowItem = styled.tr`
  &:nth-last-child(1) {
    td {
      border: none;
    }
  }

  &.highlighted {
    opacity: 1;
    z-index: 2;
  }
`

export const BoxWrapper = styled.div``

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 8px 32px 16px;
`

export const RowExpandable = styled.tr`
  color: inherit;
  display: table-row;
  outline: 0px;
  cursor: unset;
`

export const REWrapper = styled.td`
  color: inherit;
  vertical-align: middle;
  outline: 0px;
`

export const REBox = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-rows: ${({ $visible }) => ($visible ? 1 : 0)}fr;
  overflow: hidden;
  transition: grid-template-rows 0.3s;
`

export const REContainer = styled.div`
  min-height: 0;
  padding: 0 12px;
`

export const ItemData = styled.td<{
  $align?: string
  $hasPointer?: boolean
  $width?: string
}>`
  text-align: ${({ $align }) => $align ?? "left"};
  justify-items: ${({ $align }) => $align ?? "left"};
  font-size: 14px;
  font-weight: 400;
  padding: 12px;
  border-left: none;
  border-right: none;
  cursor: ${({ $hasPointer }) => ($hasPointer ? "pointer" : "unset")};
  width: ${({ $width }) => $width ?? "unset"};
  background-color: ${({ theme }) => theme.colors.neutral.white};
`
