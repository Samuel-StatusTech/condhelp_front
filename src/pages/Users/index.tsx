import { useCallback, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import SearchBlock from "../../components/SearchBlock"
import { systemOptions } from "../../utils/system/options"
import { TFilter } from "../../utils/@types/components/SearchBlock"

const UsersPage = () => {
  const navigate = useNavigate()

  const [people] = useState(fdata.people)

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

  const handleEditUser = () => {
    navigate("single")
  }

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
        data={people}
        actions={{
          edit: handleEditUser,
        }}
      />
    </S.Content>
  )
}

export default UsersPage
