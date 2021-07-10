import { IAddress } from '../../../common/address.common.interfaces';
import { IContent } from '../../../common/index.common.interfaces';
import { IOffer } from '../../../common/offer.common.interfaces';
import { IProduct } from '../../../common/product.common.interfaces';
import { IReview } from '../../../common/review.common.interfaces';
import { IShop, ITimings } from '../../../common/shop.common.interfaces';
import { ISibling } from '../../../common/sibling.common.interfaces';

export interface IPyApiHttpGetIndexResponse {
  address: IAddress;
  images: Array<string>;
  products: Array<IProduct>;
  reviews: Array<IReview>;
  shop: IShop;
  timings: ITimings;
  siblings: Array<ISibling>;
  offers: Array<IOffer>;
  contents: Array<IContent>;
}
