import { IConfiguration } from "../../redux/slices/configuration.slices.redux"
import Net, { IQuery } from "../net.http"

export default class NetPyApi extends Net {
  private configuration: IConfiguration

  constructor(configuration: IConfiguration) {
    super({})
    this.configuration = configuration
  }

  public getUrl(postfix?: string, query?: IQuery): string {
    const queryString = query? Object.keys(query).map(key => `${key}=${query[key]}`).join("&"): undefined
    const url = `${this.configuration.baseUrlPyApi}/${postfix}`
    const finalUrl = queryString? `${url}?${queryString}`: url
    console.log(finalUrl)
    return finalUrl
  }
}