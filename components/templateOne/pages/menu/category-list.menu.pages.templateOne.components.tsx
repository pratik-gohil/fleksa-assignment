import React, { Fragment, FunctionComponent, useState } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectCategoriesSearch, selectSearchQuery } from "../../../../redux/slices/menu.slices.redux";
import MenuPageProductListItem from "./product-list-item.menu.pages.templateOne.components";

const List = styled.ul`
  
`

const ListItem = styled.li`

`

const CategoryTitle = styled.h3`
  font-size: 26px;
  margin: 0;
  text-align: center;
  padding: ${props => props.theme.dimen.X4}px 0 ${props => props.theme.dimen.X4}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    padding: ${props => props.theme.dimen.X4*6}px 0 ${props => props.theme.dimen.X4}px;
  }
`

const MenuPageCategoryList: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const searchQuery = useAppSelector(selectSearchQuery)
  const categories = useAppSelector(state => selectCategoriesSearch(state, searchQuery))

  const [ openItemId, setOpenItemId ] = useState<number|undefined>()

  return <List>
    {categories.map((category, index) => {
      if (category.products.length === 0) return <Fragment key={index} />
      return <ListItem key={index} id={category.name_json.english.toLowerCase().split(" ").join("-")}>
        <CategoryTitle>{category.name_json[language]}</CategoryTitle>
        <List>
          {category.products.map(product => <MenuPageProductListItem
            key={product.id}
            product={product}
            isOpen={product.id === openItemId}
            setOpenItemId={setOpenItemId}
          />)}
        </List>
      </ListItem>
    })}
  </List>
}

export default MenuPageCategoryList