import {
  INodeApiHttpPostLoginRequestData,
  INodeApiHttpPostLoginResponse
} from "../../../interfaces/http/nodeapi/login/post.login.nodeapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpPostLogin extends ApiHttpCommon {

  public async post({ countryCode, phone, shopId }: INodeApiHttpPostLoginRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration).post<INodeApiHttpPostLoginResponse>({
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