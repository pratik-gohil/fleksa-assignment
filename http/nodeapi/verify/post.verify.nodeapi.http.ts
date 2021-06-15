import {
  INodeApiHttpPostVerifyRequestData,
  INodeApiHttpPostVerifyResponse
} from "../../../interfaces/http/nodeapi/verify/post.verify.nodeapi.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpPostVerify {

  public async post({ otp, shopId, customerId }: INodeApiHttpPostVerifyRequestData) {
    try {
      const response = await NetNodeApi.getInstance().post<INodeApiHttpPostVerifyResponse>({
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