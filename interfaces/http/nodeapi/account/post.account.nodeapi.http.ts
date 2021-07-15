export interface INodeApiHttpPatchAccountProfileRequestData {
  updating_values: {
    name?: string;
    email?: string;
  };
}

export interface INodeApiHttpPatchAccountProfileResponseData {
  result: boolean;
  message?: string;
}
