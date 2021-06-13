import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { ICategoryProduct } from "../../../../interfaces/common/category.common.interfaces";
import MenuPageProductListItem from "./product-list-item.menu.pages.templateOne.components";

export interface IPropsMenuPageCategoryListItem {
  products: Array<ICategoryProduct>
  openItemId: number|undefined
  setOpenItemId(id: number|undefined): void
}

const List = styled.ul`
  
`

const MenuPageProductList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ products, openItemId, setOpenItemId }) => {
  return <List>
    {products.map(product => <MenuPageProductListItem
      product={product}
      isOpen={product.id === openItemId}
      setOpenItemId={setOpenItemId}
    />)}
  </List>

}

export default MenuPageProductList