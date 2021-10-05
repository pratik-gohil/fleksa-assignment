import { IPyApiHttpGetAppLinksResponse } from '../../../interfaces/http/pyapi/page/get.page-data.pyapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetPyApi from '../net.pyapi.http';

export default class PyApiHttpGetAppLinks extends ApiHttpCommon {
  public async get(shop_id: number) {
    try {
      const response = await new NetPyApi(this.configuration).get<IPyApiHttpGetAppLinksResponse>({
        path: `pyapi/page/${shop_id}?type_=index`,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
