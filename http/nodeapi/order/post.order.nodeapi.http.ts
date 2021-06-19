import {
  INodeApiHttpPostOrderRequestData,
  INodeApiHttpPostOrderResponse
} from "../../../interfaces/http/nodeapi/order/post.order.nodeapi.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpPostOrder {
  private bearerToken: string|undefined

  constructor(bearerToken?: string) {
    this.bearerToken = bearerToken
  }

  public async post({ order }: INodeApiHttpPostOrderRequestData) {
    try {
      const response = await new NetNodeApi(this.bearerToken).post<INodeApiHttpPostOrderResponse>({
        path: "order/create",
        body: order as any
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}