import { IPyApiHttpGetIndexResponse } from "../../../interfaces/http/pyapi/index/get.index.pyapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpGetIndex extends ApiHttpCommon {

  public async get() {
    try {
      //"pyapi/smartpizzas.fleksa.com/index" "pyapi/restaurant-nidda.de/index"
      const restaurantUrl = this.configuration.host === "localhost:3000" || "newqa.fleksa.de"? "roma.fleksa.com": this.configuration.host
      const response = await new NetPyApi(this.configuration).get<IPyApiHttpGetIndexResponse>({
        path:  `pyapi/${restaurantUrl}/index`
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}