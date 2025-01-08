export type TNewAddress = {
  id: number
  street: string
  number: number
  complement: string
  zipCode: string
  city: string
  countryId: number
}

export type TAddress = {
  country: string | number
  state: string | number
  city: string
  street: string
  number: string
  complement: string
  zipCode: string
}

export type TCondominiumAddress = {
  street: string
  number: string
  cep: string
  neighborhood: string
  city: string
  state: string
}
