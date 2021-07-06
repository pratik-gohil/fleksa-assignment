export interface INodeApiHttpPatchAccountProfileRequestData {
  name: string;
  email?: string;
}

export interface INodeApiHttpPatchAccountProfileResponseData {
  result: boolean;
  message?: string;
}
