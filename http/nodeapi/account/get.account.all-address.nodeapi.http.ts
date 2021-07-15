import {
  INodeApiHttpGetUserAllAddressRequestData,
  INodeApiHttpGetUserAllAddressResponse,
} from '../../../interfaces/http/nodeapi/account/get.account.all-address.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpGetUserAllAddress extends ApiHttpCommon {
  public async get({}: INodeApiHttpGetUserAllAddressRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).get<INodeApiHttpGetUserAllAddressResponse>({
        path: `customer/view/address`,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
