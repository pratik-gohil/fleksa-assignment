import { IHttpGetIndexGetResponse } from "../../interfaces/http/index/get.index.http"
import Net from "../net.http"

export default class HttpGetIndex {

  public async get() {
    try {
      const response = await Net.getInstance().get<IHttpGetIndexGetResponse>({
        path: "pyapi/restaurant-nidda.de/index"
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}