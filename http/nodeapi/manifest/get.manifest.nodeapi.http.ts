import {
  INodeApiHttpGetManifestRequestData,
  INodeApiHttpGetManifestResponse,
} from '../../../interfaces/http/nodeapi/manifest/get.manifest.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpGetManifest extends ApiHttpCommon {
  public async get({ shopId }: INodeApiHttpGetManifestRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration).get<INodeApiHttpGetManifestResponse>({
        path: `shop/${shopId}/manifest.json`,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
