export enum ContentType {
  APPLICATION_JSON = "application/json"
}

export interface IQuery extends Record<string, string|number|boolean> { }

export interface IHeaders extends Record<string, string> { }

export interface IBody extends Record<string, string|string[]|number|number[]|boolean|boolean[]|IBody|IBody[]> { }

export interface IGet {
  path?: string,
  query?: IQuery,
  headers?: Array<IHeaders>
}

export interface IPost extends IGet {
  body?: IBody
}

export default abstract class Net {
  protected readonly defaultHeaders: IHeaders = {}

  constructor(defaultHeaders: IHeaders) {
    this.defaultHeaders = defaultHeaders
  }

  public async get<T>({path, query, headers}: IGet): Promise<T> {
    try {
      const response = await fetch(this.getUrl(path, query), {
        method: 'get',
        headers: { ...this.defaultHeaders, headers} as unknown as HeadersInit|undefined,
      })
      const responseJson = await response.json() as unknown as T
      return responseJson
    } catch (error) {
      throw error
    }
  }

  public async post<T>({path, query, headers, body}: IPost): Promise<T> {
    try {
      const response = await fetch(this.getUrl(path, query), {
        method: "post",
        body: JSON.stringify(body),
        headers: { ...this.defaultHeaders, headers} as unknown as HeadersInit|undefined,
      })
      const responseJson = await response.json() as unknown as T
      return responseJson
    } catch (error) {
      throw error
    }
  }

  public abstract getUrl(postfix?: string, query?: IQuery): string
}