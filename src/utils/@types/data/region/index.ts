export type TRegion = {
  id: string
  name: string
  country: string
  state: string
  cities: TCity[]
}

type TCity = {
  id: string
  acronym: string
  name: string
}
