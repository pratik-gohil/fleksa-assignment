import { AddressTypes } from "../../../../components/templateOne/common/addresses/address-manager.common.templateOne.components";

export interface IPyApiHttpPostAddressRequestData {
  area: string
  street: string
  city: string
  floor: string
  address: string
  addressType: AddressTypes
  urlpath: string
  postalCode: number
}

type IPyApiHttpPostAddressResponseCannotDeliver = {
  can_deliver: false
}

type IPyApiHttpPostAddressResponseCanDeliver = {
  can_deliver: true
  details: {
    amount: number
    charges: number
    free_from: number
  }
  amount: number
  charges: number
  free_from: null
  is_customer: boolean
}

export type IPyApiHttpPostAddressResponse = {
  category: string
  description: string
  result: boolean
} & ( IPyApiHttpPostAddressResponseCanDeliver | IPyApiHttpPostAddressResponseCannotDeliver )