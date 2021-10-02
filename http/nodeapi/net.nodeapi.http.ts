import { IConfiguration } from '../../redux/slices/configuration.slices.redux';
import Net, { IQuery } from '../net.http';

export default class NetNodeApi extends Net {
  private configuration: IConfiguration;

  constructor(configuration: IConfiguration, bearerToken?: string | null) {
    super({ bearerToken });
    this.configuration = configuration;
  }

  public getUrl(postfix?: string, query?: IQuery): string {
    const queryString = query
      ? Object.keys(query)
          .map((key) => `${key}=${query[key]}`)
          .join('&')
      : undefined;
    const url = `${this.configuration.baseUrlNodeApi}/v2/${postfix}`;
    const finalUrl = queryString ? `${url}?${queryString}` : url;
    return finalUrl;
  }
}
