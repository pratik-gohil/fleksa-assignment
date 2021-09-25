import { IPyApiHttpGetSeoResponse } from "../../../interfaces/http/pyapi/seo/get.seo.pyapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpGetSEO extends ApiHttpCommon {
  public async get(shop_id: number, type: string) {
    let mapType = (type: string): string => {
      switch(type) {
        case "/contact-us":
          return "contact"
        case "/":
          return "index"
        case `/menu/${shop_id}`:
          return "menu"
        default:
          return type
      }
    }

    type = mapType(type);

    if(type == "menu" || type == "index" || type == "contact" || type == "gallery" || type == "reservations" || type == "content") {
      try {
        const response = await new NetPyApi(this.configuration).get<IPyApiHttpGetSeoResponse>({
          path:`pyapi/page/${shop_id}?type_=${type}`
        })
        return response
      } catch (error) {
        console.error(error)
      }
    }
    
  }
}