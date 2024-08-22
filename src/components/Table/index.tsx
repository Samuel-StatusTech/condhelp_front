import { useEffect, useState } from "react"
import * as S from "./styled"

import { CompanyItem } from "./ListItems/company"
import { GoalsItem } from "./ListItems/goals"
import { PeopleItem } from "./ListItems/people"
import { DepartmentItem } from "./ListItems/department"
import { NewsboardItem } from "./ListItems/newsboard"
import Divider from "../_minimals/Divider"

import { TUser } from "../../utils/@types/data/user"
import { TGoal } from "../../utils/@types/data/goal"
import { TCompany } from "../../utils/@types/data/company"
import { TDepartment } from "../../utils/@types/data/department"
import { TNewsData } from "../../utils/@types/data/newsData"

import { ReactComponent as DropdownIcon } from "../../assets/icons/dropdown.svg"
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg"
import { system } from "../../utils/system"

type Props = {
  type: "people" | "goals" | "companies" | "departments" | "newsboard"
  data: TUser[] | TGoal[] | TCompany[] | TDepartment[] | TNewsData[]
}

const Table = (props: Props) => {
  const { type, data } = props

  const [showData, setShowData] = useState(data)

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    master: { active: true },
    leader: { active: true },
    employee: { active: true },
  })

  const handleSearch = () => {
    if (data.length > 0) {
      const list = (data as any[]).filter((i: any) => {
        const vals = Object.entries(i)
          .map((entries) => {
            if (typeof entries[1] === "string") return entries[1]
            else if (typeof entries[1] === "object") {
              const subEntries = Object.entries(entries[1] as Object).map(
                (ent) => ent[1]
              )[1]
              return subEntries
            } else return null
          })
          .flat()

        return vals.some((v: any) =>
          v.toLowerCase().includes(search.toLowerCase())
        )
      })

      setShowData(list as Props["data"])
    }
  }

  useEffect(() => {
    if (!search) setShowData(data)
  }, [search, data])

  const handleFilter = (f: "master" | "leader" | "employee") => {
    setFilters({
      ...filters,
      [f]: { active: !filters[f].active },
    })
  }

  const renderList = () => {
    let ItemComponent = (item: any) => <></>

    switch (type) {
      case "companies":
        ItemComponent = CompanyItem
        break
      case "goals":
        ItemComponent = GoalsItem
        break
      case "people":
        ItemComponent = PeopleItem
        break
      case "departments":
        ItemComponent = DepartmentItem
        break
      case "newsboard":
        ItemComponent = NewsboardItem
        break
      default:
        break
    }

    return showData.map((item, k) => (
      <ItemComponent key={k} data={item} k={k + 1} />
    ))
  }

  return (
    <S.Wrapper>
      <S.TableControl>
        <S.SearchArea>
          <S.SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Digite para pesquisar na lista"
          />
          <S.SearchBtn onClick={handleSearch}>
            <SearchIcon />
          </S.SearchBtn>
        </S.SearchArea>
        {type === "people" && (
          <S.FiltersArea>
            <S.FilterItem onClick={() => handleFilter("master")}>
              <S.FilterCheck>
                {filters.master.active && <CheckIcon />}
              </S.FilterCheck>
              <span>Master</span>
            </S.FilterItem>
            <S.FilterItem onClick={() => handleFilter("leader")}>
              <S.FilterCheck>
                {filters.leader.active && <CheckIcon />}
              </S.FilterCheck>
              <span>Líder</span>
            </S.FilterItem>
            <S.FilterItem onClick={() => handleFilter("employee")}>
              <S.FilterCheck>
                {filters.employee.active && <CheckIcon />}
              </S.FilterCheck>
              <span>Funcionário</span>
            </S.FilterItem>
          </S.FiltersArea>
        )}
      </S.TableControl>
      <Divider />
      <S.TableWrapper>
        <S.TableContent>
          <S.TableHeader>
            <tr>
              {system.tables.headers[type].map((headerItem, key) => (
                <S.TH
                  key={key}
                  $k={key}
                  $qt={system.tables.headers[type].length}
                  $hasProfile={type === "people"}
                  $w={
                    typeof headerItem.size === "number"
                      ? headerItem.size
                      : undefined
                  }
                  $wp={
                    typeof headerItem.size === "string"
                      ? headerItem.size
                      : undefined
                  }
                >
                  <S.ColControl>
                    <span>{headerItem.title}</span>
                    <DropdownIcon />
                  </S.ColControl>
                </S.TH>
              ))}
            </tr>
          </S.TableHeader>
          <S.TableList>{renderList()}</S.TableList>
        </S.TableContent>
      </S.TableWrapper>
    </S.Wrapper>
  )
}

export default Table
