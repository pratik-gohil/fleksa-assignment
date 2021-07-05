import {
  INodeApiHttpPostContactUsRequestData,
  INodeApiHttpPostContactUsResponse,
} from '../../../interfaces/http/nodeapi/contact-us/post.contact-us.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPostContactUs extends ApiHttpCommon {
  public async post({ email, name, shop_id, message, subject }: INodeApiHttpPostContactUsRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration).post<INodeApiHttpPostContactUsResponse>({
        path: 'customer/create/query',
        body: {
          email,
          name,
          shop_id,
          message,
          subject,
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
