import {
  INodeApiHttpGetUserRequestData,
  INodeApiHttpGetUserResponse
} from "../../../interfaces/http/nodeapi/user/get.user.nodeapi.http"
import NetNodeApi from "../net.nodeapi.http"

export default class NodeApiHttpGetUser {
  private bearerToken: string|undefined

  constructor(bearerToken?: string) {
    this.bearerToken = bearerToken
  }

  public async get({ }: INodeApiHttpGetUserRequestData) {
    try {
      const response = await new NetNodeApi(this.bearerToken).get<INodeApiHttpGetUserResponse>({
        path: "customer/view",
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}