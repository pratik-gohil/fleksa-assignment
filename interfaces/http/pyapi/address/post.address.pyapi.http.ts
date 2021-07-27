import { AddressTypes } from "../../../../components/templateOne/common/addresses/address-manager.common.templateOne.components"
import { IDeliveryFinances } from "../../../../redux/slices/checkout.slices.redux"
import { IParticularAddress } from "../../../common/customer.common.interfaces"

export interface IPyApiHttpPostAddressRequestData {
  area: string
  street: string
  city: string
  floor: string
  address: string
  addressType: AddressTypes
  urlpath: string
  postalCode: number
  token?: string
}

export interface IPyApiHttpPostAddressAllRequestData {
  shopId: number
  city: string
  floor: string
  address: string
  addressType: AddressTypes
  postalCode: string
  area: string
  token?: string|null
}

type IPyApiHttpPostAddressResponseCannotDeliver = {
  can_deliver: false
}

type IPyApiHttpPostAddressResponseCanDeliver = {
  can_deliver: true
  details: IDeliveryFinances
  is_customer: boolean
}

export type IPyApiHttpPostAddressResponse = {
  category: string
  description: string
  result: boolean
} & ( IPyApiHttpPostAddressResponseCanDeliver | IPyApiHttpPostAddressResponseCannotDeliver )

type ResponseDeliveryPossible = {
  customer: {
    is_customer: boolean
    details?: {
      customer_address_id: number
      address: IParticularAddress
    }
  }
  description: string
  possibilities: Record<string, {
    details: IDeliveryFinances
    is_available: boolean
  }>
  result: true
}

type ResponseDeliveryNotPossible = {
  description: string
  result: false
}

export type IPyApiHttpPostAddressAllResponse = ResponseDeliveryNotPossible | ResponseDeliveryPossible