export interface IAddress {
  address: string
  area: string
  availability: {
    has_dinein: {
      always: boolean
    }
  }
  city: string
  country: string
  country_code: number
  delivery_time: number
  email: string
  floor: string
  has_delivery: boolean
  has_dinein: boolean
  has_pickup: boolean
  has_reservations: boolean
  lat: number
  lon: number
  phone: number
  postal_code: string
  prepare_time: number
  state: string
}