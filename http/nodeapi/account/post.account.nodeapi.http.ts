import {
  INodeApiHttpPatchAccountProfileRequestData,
  INodeApiHttpPatchAccountProfileResponseData,
} from '../../../interfaces/http/nodeapi/account/post.account.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPatchAccountProfileRequest extends ApiHttpCommon {
  public async post({ updating_values }: INodeApiHttpPatchAccountProfileRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpPatchAccountProfileResponseData>({
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
