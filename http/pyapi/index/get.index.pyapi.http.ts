import { IPyApiHttpGetIndexResponse } from "../../../interfaces/http/pyapi/index/get.index.pyapi.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpGetIndex {

  public async get() {
    try {
      const response = await new NetPyApi().get<IPyApiHttpGetIndexResponse>({
        path: "pyapi/roma.fleksa.com/index" //"pyapi/smartpizzas.fleksa.com/index" "pyapi/restaurant-nidda.de/index"
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}