import { IConfiguration } from "../redux/slices/configuration.slices.redux";

export abstract class ApiHttpCommon {
  protected configuration: IConfiguration
  protected bearerToken: string|undefined

  constructor(configuration: IConfiguration, bearerToken?: string) {
    this.configuration = configuration
    this.bearerToken = bearerToken
  }
}