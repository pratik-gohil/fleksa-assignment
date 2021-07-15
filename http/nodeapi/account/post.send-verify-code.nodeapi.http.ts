import {
  INodeApiHttpPostVerifyEmailPhoneRequestData,
  INodeApiHttpPostVerifyEmailPhoneResponseData,
} from '../../../interfaces/http/nodeapi/account/post.send-verify-code.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPostVerifyEmailPhoneRequest extends ApiHttpCommon {
  public async post({ method, email, country_code, phone }: INodeApiHttpPostVerifyEmailPhoneRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpPostVerifyEmailPhoneResponseData>({
        path: 'customer/send/code',
        body: {
          method,
          email: email || '',
          country_code: country_code || '',
          phone: phone || '',
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
