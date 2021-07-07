import {
  INodeApiHttpGetUserOrderHistoryRequestData,
  INodeApiHttpGetUserOrderHistoryResponse,
} from '../../../interfaces/http/nodeapi/account/get.account.order-history.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpGetUserOrderHistory extends ApiHttpCommon {
  public async get({ shop_id }: INodeApiHttpGetUserOrderHistoryRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).get<INodeApiHttpGetUserOrderHistoryResponse>({
        path: `customer/view/order/history/${shop_id}`,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
