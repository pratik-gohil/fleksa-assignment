import { ICategory } from "../../common/category.common.interfaces";
import { IMenuPart } from "../../common/menu-part.common.interfaces";
import { IMenuSide } from "../../common/menu-side.common.interfaces";

export interface IHttpGetMenuGetRequestData {
  shopId: number
}

export interface IHttpGetMenuGetResponse {
  categories: Array<ICategory>
  sides: Record<number, IMenuSide>,
  parts: Record<number, IMenuPart>
}