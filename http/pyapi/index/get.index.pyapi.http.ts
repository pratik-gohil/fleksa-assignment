import { IPyApiHttpGetIndexResponse } from "../../../interfaces/http/pyapi/index/get.index.pyapi.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpGetIndex {

  public async get() {
    try {
      const response = await NetPyApi.getInstance().get<IPyApiHttpGetIndexResponse>({
        path: "pyapi/smartpizzas.fleksa.com/index" // "pyapi/restaurant-nidda.de/index"
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}