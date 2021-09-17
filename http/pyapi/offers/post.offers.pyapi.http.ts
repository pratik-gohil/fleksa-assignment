import {
  IPyApiHttpPostOffersPostRequestData,
  IPyApiHttpPostOffersPostResponse,
} from '../../../interfaces/http/pyapi/offers/post.offers.pyapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetPyApi from '../net.pyapi.http';

export default class PyApiHttpPostOffers extends ApiHttpCommon {
  public async post(data: IPyApiHttpPostOffersPostRequestData) {
    try {
      const response = await new NetPyApi(this.configuration).post<IPyApiHttpPostOffersPostResponse>({
        path: `pyapi/offers/apply`,
        headers: {
          'Content-Type': 'text/plain',
        },
        body: {
          code: data.code,
          order_type_: data.orderType,
          products: data.products as any,
          shop_id: data.shopId,
          token: data.token ?? '',
          payment_method: data.payment_method ?? '',
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
