import { IPyApiHttpGetSeoResponse } from '../../../interfaces/http/pyapi/seo/get.seo.pyapi.http';
import { getPageType } from '../../../utils/seo.util';
import { ApiHttpCommon } from '../../base.http';
import NetPyApi from '../net.pyapi.http';

export default class PyApiHttpGetSEO extends ApiHttpCommon {
  public async get(shop_id: number, sourceType: string) {
    const targetType = await getPageType(sourceType, shop_id);

    if (['menu', 'index', 'contact', 'gallery', 'reservations', 'content'].includes(targetType)) {
      try {
        const response = await new NetPyApi(this.configuration).get<IPyApiHttpGetSeoResponse>({
          path: `pyapi/page/${shop_id}?type_=${targetType}`,
        });
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
