import styled from "styled-components"

export const Wrapper = styled.div``

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

  @media (max-width: ${({ theme }) => theme.bp.small}px) {
    width: 100%;
  }
`

export const SearchInput = styled.input`
  flex: 1;
  background: ${({ theme }) => theme.colors.neutral.white};
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

export const TableWrapper = styled.div`
  max-width: 100%;
  overflow: auto;
`

export const TableContent = styled.table`
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
  background-color: ${({ theme }) => theme.colors.neutral.soft};
  border-radius: 4px;
  border-top: 10px solid ${({ theme }) => theme.colors.yellow.main};
  border-bottom: 10px solid ${({ theme }) => theme.colors.yellow.main};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.white};
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeTop +
    theme.animations.durations.main +
    theme.animations.delays.main($k)}
`

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const UserNameBox = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.yellow.dark};
  background-color: ${({ theme }) => theme.colors.neutral.white};
  padding: 4px;
  border-radius: 16px;
`

export const NameArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

export const UserName = styled.div`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.yellow.dark};
    font-weight: 600;
  }
`

export const DropBtn = styled.div`
  display: grid;
  place-items: center;
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
