import Net, { IQuery } from "../net.http"

export default class NetPyApi extends Net {

  constructor() {
    super({})
  }

  public getUrl(postfix?: string, query?: IQuery): string {
    const queryString = query? Object.keys(query).map(key => `${key}=${query[key]}`).join("&"): undefined
    const url = `https://myqa.fleksa.com/${postfix}`
    const finalUrl = queryString? `${url}?${queryString}`: url
    console.log(finalUrl)
    return finalUrl
  }
}