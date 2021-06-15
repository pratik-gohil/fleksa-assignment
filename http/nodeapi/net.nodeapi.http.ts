import Net, { ContentType, IQuery } from "../net.http"

export default class NetNodeApi extends Net {
  private static instance: NetNodeApi

  private constructor() {
    const defaultHeaders = {
      "Content-Type": ContentType.APPLICATION_JSON
    }
    super(defaultHeaders)
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new NetNodeApi()
    }
    return this.instance
  }

  public getUrl(postfix?: string, query?: IQuery): string {
    const queryString = query? Object.keys(query).map(key => `${key}=${query[key]}`).join("&"): undefined
    const url = `http://localhost:4000/v2/${postfix}`
    const finalUrl = queryString? `${url}?${queryString}`: url
    console.log(finalUrl)
    return finalUrl
  }
}