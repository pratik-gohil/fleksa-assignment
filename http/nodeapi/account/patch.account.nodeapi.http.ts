import {
  INodeApiHttpPatchAccountProfileRequestData,
  INodeApiHttpPatchAccountProfileResponseData,
} from '../../../interfaces/http/nodeapi/account/patch.account.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPatchAccountProfileRequest extends ApiHttpCommon {
  public async patch({ updating_values }: INodeApiHttpPatchAccountProfileRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).patch<INodeApiHttpPatchAccountProfileResponseData>({
        path: 'customer/update/profile',
        body: {
          updating_values,
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
