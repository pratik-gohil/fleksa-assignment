export interface ICustomer {
  name: string;
  email?: string;
  country_code?: number;
  phone?: string;
  email_verified: number;
  phone_verified: number;
  orders?: Array<IParticularOrder>;
  current_order?: IParticularOrderBriefInfo;
}

export interface IParticularOrder {
  id: number;
  uis: string;
  order_type: string;
  amount: number;
  created_at: string;
  payment_method: string;
  pdf_url?: string;
  no_of_products: number;
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

export interface IParticularOrder {
  id: number;
  name?: string;
  price: number;
  type: string;
  sku?: string;
  quantity: number;
  discount: number;
}

export interface IParticularOrderBriefInfo {
  id: number;
  name?: string;
  type: string;
  sku?: string;
  quantity: number;
  discount: number;
  want_at: string;
  updated_at: string;
  delivered_at: string;
  description: string;
  status: string;
  is_delivery: boolean;
  delivery_address?: IDeliveryAddress;
  price: {
    tip: number;
    total: number;
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
  products: Array<IParticularOrder>;
}
