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
import { userSubordinates } from "../../utils/system/options/profiles"
import { TAccess } from "../../utils/@types/data/access"

const UsersPage = () => {
  const navigate = useNavigate()

  const { user, controllers } = getStore()

  const [people, setPeople] = useState<TUser[]>([])

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    profile: "all",
    status: "all",
  })
  const [options, setOptions] = useState({
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
      const req = await Api.persons.listAll({ size: 300 })

      if (req.ok) {
        const userAllowed = userSubordinates[user?.profile as TAccess].map(
          (i) => i.key
        )

        const filtered = req.data.content.filter((i) =>
          userAllowed.includes(i.profile)
        )

        setPeople(filtered)
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: req.error,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "alert",
        message:
          "Houve um erro ao processar as informações. Tente novamente mais tarde.",
      })

      navigate(-1)
    }
  }, [controllers.feedback, navigate, user?.profile])

  useEffect(() => {
    loadData()

    const usersOptions = [
      { key: "all", value: "Todos" },
      ...(userSubordinates[user?.profile as TAccess] ?? []),
    ]

    setOptions((opts) => ({
      ...opts,
      profile: usersOptions,
    }))
  }, [loadData, user?.profile])

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
