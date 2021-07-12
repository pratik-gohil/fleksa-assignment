import {
  IPyApiHttpPostAddressRequestData,
  IPyApiHttpPostAddressResponse,
  IPyApiHttpPostAddressAllRequestData,
  IPyApiHttpPostAddressAllResponse
} from "../../../interfaces/http/pyapi/address/post.address.pyapi.http"
import { ApiHttpCommon } from "../../base.http"
import NetPyApi from "../net.pyapi.http"

export default class PyApiHttpPostAddress extends ApiHttpCommon {

  public async post(data: IPyApiHttpPostAddressRequestData) {
    try {
      const response = await new NetPyApi(this.configuration).post<IPyApiHttpPostAddressResponse>({
        path:`pyapi/address`,
        headers: {
          "Content-Type": "text/plain",
        },
        body: {
          area: data.area,
          street: data.street,
          city: data.city,
          floor: data.floor,
          address: data.address,
          address_type: data.addressType,
          urlpath: data.urlpath,
          postal_code: data.postalCode,
        }
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  public async postAll(data: IPyApiHttpPostAddressAllRequestData) {
    try {
      const response = await new NetPyApi(this.configuration).post<IPyApiHttpPostAddressAllResponse>({
        path:`pyapi/address/all`,
        headers: {
          "Content-Type": "text/plain",
        },
        body: {
          area: data.area,
          shop_id: data.shopId,
          postal_code: data.postalCode,
        }
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}