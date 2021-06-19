import {
  INodeApiHttpPostOrderRequestData,
  INodeApiHttpPostOrderResponse
} from "../../../interfaces/http/nodeapi/order/post.order.nodeapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpPostOrder extends ApiHttpCommon {

  public async post({ order }: INodeApiHttpPostOrderRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpPostOrderResponse>({
        path: "order/create",
        body: order as any
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}