import { IPyApiHttpGetMenuGetResponse, IPyApiHttpGetMenuGetRequestData } from "../../../interfaces/http/pyapi/menu/get.menu.pyapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpGetMenu extends ApiHttpCommon {

  public async get({ shopId }: IPyApiHttpGetMenuGetRequestData) {
    try {
      const response = await new NetPyApi(this.configuration).get<IPyApiHttpGetMenuGetResponse>({
        path: `pyapi/${shopId}/menu`
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}