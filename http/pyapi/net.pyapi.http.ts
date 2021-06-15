import Net, { ContentType, IQuery } from "../net.http"

export default class NetPyApi extends Net {
  private static instance: NetPyApi

  private constructor() {
    const defaultHeaders = {
      "Content-Type": ContentType.APPLICATION_JSON
    }
    super(defaultHeaders)
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new NetPyApi()
    }
    return this.instance
  }

  public getUrl(postfix?: string, query?: IQuery): string {
    const queryString = query? Object.keys(query).map(key => `${key}=${query[key]}`).join("&"): undefined
    const url = `https://myqa.fleksa.com/${postfix}`
    const finalUrl = queryString? `${url}?${queryString}`: url
    console.log(finalUrl)
    return finalUrl
  }
}