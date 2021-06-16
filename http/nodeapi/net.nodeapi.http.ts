import Net, { IQuery } from "../net.http"

export default class NetNodeApi extends Net {
  constructor(bearerToken?: string) {
    super({ bearerToken })
  }

  public getUrl(postfix?: string, query?: IQuery): string {
    const queryString = query? Object.keys(query).map(key => `${key}=${query[key]}`).join("&"): undefined
    const url = `http://192.168.1.4:4000/v2/${postfix}`
    const finalUrl = queryString? `${url}?${queryString}`: url
    console.log(finalUrl)
    return finalUrl
  }
}