import { IPyApiHttpGetIndexResponse } from "../../../interfaces/http/pyapi/index/get.index.pyapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpGetIndex extends ApiHttpCommon {

  public async get() {
    try {
      const response = await new NetPyApi(this.configuration).get<IPyApiHttpGetIndexResponse>({
        path:`pyapi/${this.configuration.host}/index`
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}