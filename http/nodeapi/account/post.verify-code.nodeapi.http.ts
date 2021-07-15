import {
  INodeApiHttpPostVerifyCodeRequestData,
  INodeApiHttpPostVerifyCodeResponseData,
} from '../../../interfaces/http/nodeapi/account/post.verify-otp.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPostVerifyCodeRequest extends ApiHttpCommon {
  public async post({ otp }: INodeApiHttpPostVerifyCodeRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpPostVerifyCodeResponseData>({
        path: 'customer/verify/code',
        body: {
          otp,
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
