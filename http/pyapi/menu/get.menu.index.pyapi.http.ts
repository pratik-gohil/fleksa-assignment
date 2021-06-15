import { IPyApiHttpGetMenuGetResponse, IPyApiHttpGetMenuGetRequestData } from "../../../interfaces/http/pyapi/menu/get.menu.pyapi.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpGetMenu {

  public async get({ shopId }: IPyApiHttpGetMenuGetRequestData) {
    try {
      const response = await NetPyApi.getInstance().get<IPyApiHttpGetMenuGetResponse>({
        path: `pyapi/${shopId}/menu`
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}