import { IPyApiHttpPostOffersPostRequestData, IPyApiHttpPostOffersPostResponse } from "../../../interfaces/http/pyapi/offers/post.offers.pyapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpPostOffers extends ApiHttpCommon {

  public async post(data: IPyApiHttpPostOffersPostRequestData) {
    try {
      const response = await new NetPyApi(this.configuration).post<IPyApiHttpPostOffersPostResponse>({
        path: `pyapi/checkout/offers`,
        headers: {
          "Content-Type": "text/plain",
        },
        body: {
          code: data.code,
          order_type: data.orderType,
          products: data.products as any,
          shop_id: data.shopId,
          sub_total_amount: data.subTotalAmount,
          token: data.token
        }
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}