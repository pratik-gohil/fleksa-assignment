import {
  INodeApiHttpReservationRequestData,
  INodeApiHttpReservationResponseData,
} from '../../../interfaces/http/nodeapi/reservation/reservation.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPostRervation extends ApiHttpCommon {
  public async post({
    countryCode,
    phone,
    guests_count,
    email,
    name,
    date_time,
    description,
    shop_id,
    shop,
  }: INodeApiHttpReservationRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpReservationResponseData>({
        path: 'customer/book/table',
        body: {
          country_code: countryCode,
          phone: phone,
          description,
          email,
          name,
          date_time,
          guests_count,
          shop_id,
          shop: {
            ...shop,
            id: shop.id ?? '',
          },
        },
      });
      return response;
    } catch (e) {
      console.error(e);
      return {
        result: false,
        // message: e.
      };
    }
  }
}
