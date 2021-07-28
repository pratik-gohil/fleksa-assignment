import { AddressTypes } from '../../components/templateOne/common/addresses/address-manager.common.templateOne.components';

export interface ICustomer {
  name: string;
  email?: string;
  country_code?: number;
  phone?: string;
  email_verified: number;
  phone_verified: number;
  orders?: Array<IParticularOrder>;
  current_order?: IParticularOrderBriefInfo;
  all_address: Array<IParticularAddress>;
}

export interface IParticularOrder {
  id: number;
  uis: string;
  order_type: string;
  amount: number;
  created_at: string;
  payment_method: string;
  no_of_products: number;
  pdf_url?: string;
}

export interface IDeliveryAddress {
  floor?: string;
  area?: string;
  address?: string;
  country: string;
  postal_code: string;
  city: string;
  state: string;
}

export interface IParticularProduct {
  id: number;
  name: Array<{
    name: {
      english: string;
      german: string;
    };
    isRoot?: boolean;
    type: string;
  }>;
  price: number;
  type: string;
  sku?: string;
  quantity: number;
  discount: number;
}

export interface IParticularOrderBriefInfo {
  id: number;
  name?: string;
  order_type: string;
  sku?: string;
  quantity: number;
  discount: number;
  want_at: string;
  created_at: string;
  updated_at: string;
  delivered_at: string;
  description: string;
  status: string;
  is_delivery: boolean;
  delivery_address?: IParticularAddress;
  payment_method: string;
  pdf_url?: string;
  price: {
    tip: number;
    total_amount: number;
    sub_total: number;
    delivery_fee: number;
    tax: number;
    discount: number;
  };
  customer: {
    name: string;
    phone: string;
    country_code: string;
  };
  shop: {
    name: string;
    phone: string;
    country_code: string;
    logo: string;
    address: IDeliveryAddress;
  };
  products: Array<IParticularProduct>;
}

export interface IParticularAddress extends IDeliveryAddress {
  id: number;
  address_type: AddressTypes;
}
