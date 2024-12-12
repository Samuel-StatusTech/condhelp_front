export type TNewRegion = {
  name: string
  countryId: string
  stateId: string
  cities: TCity[]
}

export type TRegion = {
  id: number
  name: string
  country: TCountry
  state: TState
  cities: TCity[]
}

export type TCity = {
  id: number
  name: string
  state?: TState

  notPicked?: boolean
}

export type TNewCity = {
  name: string
  stateId: number
}

export type TState = {
  id: number
  name: string
  initials: string
  country: TCountry
}

export type TNewState = {
  name: string
  countryId: number
}

export type TCountry = {
  id: number
  name: string
}

export type TNewCountry = {
  name: string
}
