import { useCallback, useEffect, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"

import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import SearchBlock from "../../components/SearchBlock"
import { systemOptions } from "../../utils/system/options"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import { Api } from "../../api"
import { getStore } from "../../store"
import { TUser } from "../../utils/@types/data/user"

const UsersPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [people, setPeople] = useState<TUser[]>([])

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    profile: "",
    status: "",
  })
  const [options] = useState({
    profile: systemOptions.profiles,
    status: systemOptions.userStatus,
  })

  const handleFilters = (filter: Partial<TFilter>) => {
    setFilters((filtersList) => ({
      ...filtersList,
      [filter.name as string]: filter.value,
    }))
  }

  const handleSearch = async () => {}

  // Engine

  const handleNew = useCallback(() => {
    navigate("single")
  }, [navigate])

  const handleEditUser = (id: number) => {
    navigate(`single/${id}`)
  }

  // Start component

  const loadData = useCallback(async () => {
    try {
      const req = await Api.persons.listAll({})

      if (req.ok) {
        setPeople(req.data.content)
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: req.error,
        })
      }
    } catch (error) {
      // ...
    }
  }, [controllers.feedback])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Content>
      <PageHeader type={"table"} from={"users"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquisar usuários"}
        onSearchChange={setSearch}
        onFilterChange={handleFilters}
        onSearch={handleSearch}
        filters={[
          {
            label: "Perfil",
            name: "profile",
            options: options.profile,
            value: filters.profile,
          },
          {
            label: "Status",
            name: "status",
            options: options.status,
            value: filters.status,
          },
        ]}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.users}
        data={people.filter((i) => {
          let ok = true

          const searchOk = !!search
            ? Object.values(i).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
              )
            : true

          const profileOk =
            !!filters.profile && filters.profile !== "all"
              ? i.profile === filters.profile
              : true

          const statusOk =
            !!filters.status && filters.status !== "all"
              ? i.status === filters.status
              : true

          ok = searchOk && profileOk && statusOk

          return ok
        })}
        actions={{
          edit: handleEditUser,
        }}
      />
    </S.Content>
  )
}

export default UsersPage
