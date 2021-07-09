import {
  INodeApiHttpPostDeleteAddressRequestData,
  INodeApiHttpPostDeleteAddressResponseData,
} from '../../../interfaces/http/nodeapi/account/post.delete-address.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPostDeleteAddressRequest extends ApiHttpCommon {
  public async post({ customer_address_id, updating_values }: INodeApiHttpPostDeleteAddressRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpPostDeleteAddressResponseData>({
        path: 'customer/create/address',
        body: {
          customer_address_id,
          updating_values: {
            ...updating_values,
          },
        },
      });
      return response;
    } catch (e) {
      console.error(e);
      return {
        result: false,
      };
    }
  }
}
