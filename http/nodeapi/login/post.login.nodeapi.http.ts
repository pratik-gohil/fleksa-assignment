import {
  INodeApiHttpPostLoginRequestData,
  INodeApiHttpPostLoginResponse
} from "../../../interfaces/http/nodeapi/login/post.login.nodeapi.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpPostLogin {

  public async post({ countryCode, phone, shopId }: INodeApiHttpPostLoginRequestData) {
    try {
      const response = await NetNodeApi.getInstance().post<INodeApiHttpPostLoginResponse>({
        path: "role/customer/login",
        body: {
          country_code: countryCode,
          phone: phone,
          shop_id: shopId
        }
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}