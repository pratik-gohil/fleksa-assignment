import { IAddress } from './address.common.interfaces';
import { ILanguageData } from './language-data.common.interfaces';
import { ITimings } from './shop.common.interfaces';

export interface ISibling {
  address: IAddress
  name: string;
  category_json: ILanguageData;
  id: number;
  logo: string;
  urlpath: string;
  timings: ITimings;
  cover_json: {
    images: Array<string>;
  };
}
