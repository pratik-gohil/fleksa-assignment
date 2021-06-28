import { IAddress } from "../../../common/address.common.interfaces";
import { IProduct } from "../../../common/product.common.interfaces";
import { IReview } from "../../../common/review.common.interfaces";
import { IShop, ITimings } from "../../../common/shop.common.interfaces";

export interface IPyApiHttpGetIndexResponse {
  address: IAddress
  images: Array<string>
  products: Array<IProduct>
  reviews: Array<IReview>
  shop: IShop
  timings: ITimings
}