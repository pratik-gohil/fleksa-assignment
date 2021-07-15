import { IParticularOrder } from '../../../common/customer.common.interfaces';

export interface INodeApiHttpGetUserOrderHistoryRequestData {
  shop_id: number;
}

export interface INodeApiHttpGetUserOrderHistoryResponse {
  result: boolean;
  data: {
    orders?: Array<IParticularOrder>;
  };
}
