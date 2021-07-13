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
  position: relative;
  z-index: 0;
`

const CategoryTitle = styled.h3`
  font-size: 26px;
  margin: -2px -15px;
  text-align: center;
  position: sticky;
  top: 50px;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  padding: ${props => props.theme.dimen.X4}px 0 ${props => props.theme.dimen.X4}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    top: 10px;
    padding: 0 0 ${props => props.theme.dimen.X4}px;
  }
`

const Space = styled.div`
  width: 100%;
  height: 100px;
`

const MenuPageCategoryList: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  const searchQuery = useAppSelector(selectSearchQuery)
  const categories = useAppSelector(state => selectCategoriesSearch(state, searchQuery))

  const [ openItemId, setOpenItemId ] = useState<number|undefined>()

  return <List>
    {categories.map((category, index) => {
      if (category.products.length === 0) return <Fragment key={index} />
      return <Fragment key={index}>
        <Space />
        <ListItem id={category.name_json.english.toLowerCase().replace(/[^A-Za-z0-9]/g,"").split(" ").join("-")}>
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
      </Fragment>
    })}
  </List>
}

export default MenuPageCategoryList