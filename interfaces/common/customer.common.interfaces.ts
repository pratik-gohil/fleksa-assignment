export interface ICustomer {
  name: string;
  email?: string;
  country_code?: number;
  phone?: string;
  email_verified: number;
  phone_verified: number;
  orders?: Array<IParticularOrder>;
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
