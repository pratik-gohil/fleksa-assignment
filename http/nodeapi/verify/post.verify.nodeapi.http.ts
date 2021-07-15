import {
  INodeApiHttpPostVerifyRequestData,
  INodeApiHttpPostVerifyResponse
} from "../../../interfaces/http/nodeapi/verify/post.verify.nodeapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpPostVerify extends ApiHttpCommon {

  public async post({ otp, shopId, customerId }: INodeApiHttpPostVerifyRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration).post<INodeApiHttpPostVerifyResponse>({
        path: "role/customer/verify",
        body: {
          otp,
          shop_id: shopId,
          customer_id: customerId
        }
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}