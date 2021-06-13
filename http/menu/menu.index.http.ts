import { IHttpGetMenuGetResponse, IHttpGetMenuGetRequestData } from "../../interfaces/http/menu/get.menu.http"
import Net from "../net.http"

export default class HttpGetMenu {

  public async get({ shopId }: IHttpGetMenuGetRequestData) {
    try {
      const response = await Net.getInstance().get<IHttpGetMenuGetResponse>({
        path: `pyapi/${shopId}/menu`
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}