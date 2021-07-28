import {
  INodeApiHttpGetUserParticularOrderRequestData,
  INodeApiHttpGetUserParticularOrderResponse,
} from '../../../interfaces/http/nodeapi/account/get.order-view-by-id.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpGetUserParticularOrder extends ApiHttpCommon {
  public async get({ order_id }: INodeApiHttpGetUserParticularOrderRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).get<INodeApiHttpGetUserParticularOrderResponse>({
        path: `order/view/${order_id}`,
      });
      return response;
    } catch (error) {
      console.error(error);
      return {
        result: false,
        message: 'Try again later.',
      };
    }
  }
}
