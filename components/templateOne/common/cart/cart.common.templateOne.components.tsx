import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectCart } from "../../../../redux/slices/cart.slices.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectCategories } from "../../../../redux/slices/menu.slices.redux";
import MenuPageProductList from "../../pages/menu/product-list.menu.pages.templateOne.components";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    position: relative;
  }
`

const List = styled.ul`
  
`

const ListItem = styled.li`

`

const CategoryTitle = styled.h3`

`

const Cart: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const cartData = useAppSelector(selectCart)

  return <Wrapper>
    <List>
      {Object.keys(cartData.items).map(key => {
        const cartItem = cartData.items[key]
        return <ListItem>
          <p>{cartItem.mainName[language]} ({cartItem.partName && cartItem.partName[language]})</p>
        </ListItem>
      })}
    </List>
  </Wrapper>
}

export default Cart