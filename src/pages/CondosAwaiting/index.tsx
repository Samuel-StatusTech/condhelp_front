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
import initials from "../../utils/initials"
import { TDefaultFilters } from "../../api/types/params"
import { matchSearch } from "../../utils/tb/helpers/matchSearch"

const AwaitingCondosPage = () => {
  const { user, controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [condos, setCondos] = useState<TCondominium[]>([])
  const [search, setSearch] = useState("")

  const [searchControl, setSearchControl] = useState(initials.pagination)

  const [searchFilters, setSearchFilters] = useState<TDefaultFilters>({
    page: initials.pagination.pageable.pageNumber,
    size: initials.pagination.size,
    sort: undefined,
  })

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

  const loadData = useCallback(
    async (params: TDefaultFilters) => {
      setLoading(true)

      try {
        const userReq = await Api.persons.getSingle({
          id: user?.userId as number,
        })

        if (userReq.ok) {
          controllers.user.setData(userReq.data)
        }

        const req = await Api.condos.getWaitingList({})

        if (req.ok) {
          setSearchControl(req.data)
          setCondos(req.data.content)
        } else {
          controllers.feedback.setData({
            visible: true,
            state: "alert",
            message: req.error,
          })
        }

        setLoading(false)
      } catch (error) {
        // ...

        setLoading(false)
      }
    },
    [controllers.feedback, controllers.user, user?.userId]
  )

  useEffect(() => {
    loadData(searchFilters)
  }, [loadData, searchFilters])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  const rejectCondoAction = async (
    condoId: number,
    rejectionReason: string
  ) => {
    try {
      const req = await Api.condos.reject({ id: condoId, rejectionReason })
      if (req.ok) {
        controllers.modal.close()

        controllers.feedback.setData({
          visible: true,
          state: "error",
          message: "Condomínio recusado com sucesso.",
        })

        setCondos((prev) => prev.filter((c) => c.id !== condoId))
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "error",
          message: req.error,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message:
          "Houve um erro ao recusar o condomínio. Tente novamente mais tarde.",
      })
    }
  }

  const approveCondoAction = async (condoId: number) => {
    setLoading(true)

    try {
      const req = await Api.condos.approve({ id: condoId })
      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Condomínio aprovado com sucesso.",
        })

        setCondos((prev) => prev.filter((c) => c.id !== condoId))
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "error",
          message: req.error,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message:
          "Houve um erro ao aprovar o condomínio. Tente novamente mais tarde.",
      })
    }

    setLoading(false)
  }

  const handleRejectCondo = (condo: TCondominium) => {
    controllers.modal.open({
      role: "rejectCondominium",
      visible: true,
      handleOp: rejectCondoAction as () => Promise<any>,
      data: {
        condoId: condo.id,
      },
      width: "sm",
    })
  }

  const handleApproveCondo = (condo: TCondominium) => {
    approveCondoAction(condo.id)
  }

  const renderContent = () => {
    return user?.profile === "SINDICO" ? (
      <S.CardsWrapper>
        {user.condominiums.length === 0 ? (
          <S.EmptyListWrapper>
            <Icons.Conds />
            <span>
              Você ainda não possui
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
          config={tableConfig.awaitingcondos}
          loading={loading}
          searchData={searchControl}
          setSearchFilters={setSearchFilters}
          data={condos.filter((i) => {
            let ok = true

            const fields = [i.name, i.city]

            const searchOk = !!search
              ? fields.some((val) => matchSearch(val, search))
              : true

            const stateOk =
              !!filters.states && filters.states !== "all"
                ? i.federateUnit === filters.states
                : true

            ok = searchOk && stateOk

            return ok
          })}
          actions={{
            rejectCondo: handleRejectCondo,
            approveCondo: handleApproveCondo,
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

export default AwaitingCondosPage
