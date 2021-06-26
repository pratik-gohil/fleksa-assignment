import {
  INodeApiHttpPostPaypalRequestData,
  INodeApiHttpPostPaypalResponse,
} from "../../../interfaces/http/nodeapi/paypal/post.paypal.nodeapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpPostPaypal extends ApiHttpCommon {

  public async postOrderSuccess({ paypalOrderId }: INodeApiHttpPostPaypalRequestData): Promise<INodeApiHttpPostPaypalResponse> {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpPostPaypalResponse>({
        path: "paypal/order/success",
        body: {
          paypal_order_id: paypalOrderId
        }
      })
      return response
    } catch (error) {
      throw error
    }
  }
}