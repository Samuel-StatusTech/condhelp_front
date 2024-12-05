import { useCallback, useEffect, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import { systemOptions } from "../../utils/system/options"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import SearchBlock from "../../components/SearchBlock"
import { getStore } from "../../store"
import { Api } from "../../api"

import Card from "../../components/Card"

import { TCondominium } from "../../utils/@types/data/condominium"
import { Icons } from "../../assets/icons/icons"
import Button from "../../components/Button"

const CondosPage = () => {
  const { user, controllers } = getStore()

  const navigate = useNavigate()

  const [condos, setCondos] = useState<TCondominium[]>([])
  const [search, setSearch] = useState("")

  const [filters, setFilters] = useState({
    states: "",
  })
  const [options] = useState({
    states: systemOptions.states,
  })

  const handleNew = useCallback(() => {
    navigate("single")
  }, [navigate])

  const handleEdit = (id: number) => {
    navigate(`single/${id}`)
  }

  const handleFilters = (filter: Partial<TFilter>) => {
    setFilters((filtersList) => ({
      ...filtersList,
      [filter.name as string]: filter.value,
    }))
  }

  const handleSearch = async () => {}

  // Start component

  const loadData = useCallback(async () => {
    try {
      const userReq = await Api.persons.getSingle({
        id: user?.userId as number,
      })

      if (userReq.ok) {
        controllers.user.setData(userReq.data)
      }

      const req = await Api.condos.listAll({})

      if (req.ok) {
        setCondos(req.data.content)
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
  }, [controllers.feedback, controllers.user, user?.userId])

  useEffect(() => {
    loadData()
  }, [loadData])

  const renderContent = () => {
    return user?.profile === "SINDICO" ? (
      <S.CardsWrapper>
        {user.condominiums.length === 0 ? (
          <S.EmptyListWrapper>
            <Icons.Conds />
            <span>
              Você ainda possui
              <br />
              condomínios cadastrados...
            </span>
            <Button
              type="main"
              text="Cadastrar condomínio"
              action={handleNew}
              icon={<Icons.PlusCircle />}
              iconLeft={true}
              fromSidebar={true}
            />
          </S.EmptyListWrapper>
        ) : (
          user.condominiums.map((c, ck) => (
            <Card.Condominium
              k={ck}
              key={ck}
              onPick={() => handleEdit(c.id)}
              data={c}
            />
          ))
        )}
      </S.CardsWrapper>
    ) : (
      <>
        <SearchBlock
          search={search}
          searchPlaceholder={
            "Pesquisar condomínios por nome, cidade, síndico..."
          }
          onSearchChange={setSearch}
          onFilterChange={handleFilters}
          onSearch={handleSearch}
          filters={[
            {
              label: "Estado",
              name: "states",
              options: options.states,
              value: filters.states,
              byKey: true,
            },
          ]}
        />

        <Divider />

        {/* Table content */}
        <Table
          config={tableConfig.condos}
          data={condos.filter((i) => {
            let ok = true

            const searchOk = !!search
              ? Object.values(i).some((val) =>
                  String(val).toLowerCase().includes(search.toLowerCase())
                )
              : true

            const stateOk =
              !!filters.states && filters.states !== "all"
                ? i.federateUnit === filters.states
                : true

            ok = searchOk && stateOk

            return ok
          })}
          actions={{
            edit: handleEdit,
          }}
        />
      </>
    )
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"condos"} action={handleNew} />

      <Divider />

      {renderContent()}
    </S.Content>
  )
}

export default CondosPage
