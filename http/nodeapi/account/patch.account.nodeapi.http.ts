import {
  INodeApiHttpPatchAccountProfileRequestData,
  INodeApiHttpPatchAccountProfileResponseData,
} from '../../../interfaces/http/nodeapi/account/patch.account.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPatchAccountProfileRequest extends ApiHttpCommon {
  public async patch({ email, name }: INodeApiHttpPatchAccountProfileRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration).patch<INodeApiHttpPatchAccountProfileResponseData>({
        path: 'customer/update/profile',
        body: {
          email: email || '',
          name,
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
