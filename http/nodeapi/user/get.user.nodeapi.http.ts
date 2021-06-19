import {
  INodeApiHttpGetUserRequestData,
  INodeApiHttpGetUserResponse
} from "../../../interfaces/http/nodeapi/user/get.user.nodeapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpGetUser extends ApiHttpCommon {
  
  public async get({ }: INodeApiHttpGetUserRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).get<INodeApiHttpGetUserResponse>({
        path: "customer/view",
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}