import * as C from "../../styled"

import { TRegion } from "../../../../utils/@types/data/region"

import FranchiseCities from "../partials/franchiseCities"

type Props = {
  form: any
  regions: TRegion[]
  setIsManagingFranchiseCities: (value: boolean) => void
  handleField: (field: string, value: any) => void
}

export const FranchiseCitiesContent = (props: Props) => {
  const { form, regions, setIsManagingFranchiseCities, handleField } = props

  return (
    <C.Content>
      <FranchiseCities
        cities={form.cities}
        region={regions.find((r) => r.id === form.region) as TRegion}
        handleBack={() => setIsManagingFranchiseCities(false)}
        handleList={(list) => handleField("cities", list)}
      />
    </C.Content>
  )
}
