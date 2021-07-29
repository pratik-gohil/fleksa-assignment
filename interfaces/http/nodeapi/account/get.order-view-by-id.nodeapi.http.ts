import { IParticularOrderBriefInfo } from '../../../common/customer.common.interfaces';

export interface INodeApiHttpGetUserParticularOrderRequestData {
  order_id: number;
}

export interface INodeApiHttpGetUserParticularOrderResponse {
  result: boolean;
  data?: {
    order: IParticularOrderBriefInfo;
  };
  message?: string;
}
