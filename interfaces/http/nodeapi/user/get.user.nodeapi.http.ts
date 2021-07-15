import { ICustomer } from "../../../common/customer.common.interfaces";

export interface INodeApiHttpGetUserRequestData {
  
}

export interface INodeApiHttpGetUserResponse {
  result: boolean
  data: {
    customer: ICustomer
  }
}